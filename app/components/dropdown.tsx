import React from "react";

import usePrevious from "../utils/use-previous";

type DropDownOption = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function DropDown({
  label = "...",
  ariaLabel,
  options,
}: {
  label?: string;
  ariaLabel?: string;
  options: DropDownOption[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  // const id = React.useId()
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownListRef = React.useRef<HTMLUListElement>(null);
  const prevIsOpen = usePrevious(isOpen);

  React.useEffect(() => {
    if (prevIsOpen) {
      toggleButtonRef.current?.focus();
    }
  }, [prevIsOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Focus the first option button when dropdown is opened.
    dropdownListRef.current?.querySelector("button")?.focus();

    function handleClickOutside(e: MouseEvent) {
      const typedTarget = e.target as HTMLElement;
      const insideToggleButton = toggleButtonRef.current?.contains(typedTarget);
      const insideDropdownList = dropdownListRef.current?.contains(typedTarget);
      if (!(insideToggleButton || insideDropdownList)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => setIsOpen(prevIsOpen => !prevIsOpen);

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }

  return (
    <div style={{ display: "inline-block" }} onKeyUp={handleKeyUp}>
      <button
        ref={toggleButtonRef}
        aria-label={ariaLabel}
        aria-haspopup
        // aria-controls={`dropdown-list-${id}`}
        onClick={handleClick}
      >
        {label}
      </button>
      {isOpen && (
        <ul
          ref={dropdownListRef}
          // id={`dropdown-list-${id}`}
          role="list"
          style={{ listStyle: "none", padding: 0 }}
        >
          {options.map(option => (
            <li key={option.label}>
              <button onClick={option.onClick}>{option.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
