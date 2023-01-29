import React from "react";

const keys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export default function Keypad({ passcode = "324881" }: { passcode?: string }) {
  const [state, setState] = React.useState<number[]>([]);

  const enter = React.useCallback(
    (key: number) => {
      setState(prevState => {
        const index = prevState.length;
        if (index === passcode.length) {
          return prevState;
        }
        if (key === Number(passcode[index])) {
          return [...prevState, key];
        }
        return [];
      });
    },
    [passcode]
  );

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key.match(/\d+/)) {
        enter(Number(e.key));
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [enter]);

  return (
    <div>
      {keys.map((row, i) => (
        <div key={i}>
          {row.map(n => (
            <button key={n} onClick={() => enter(n)}>
              {n}
            </button>
          ))}
        </div>
      ))}
      <div>Status: {"[ " + state.map(() => "✓") + " ]"}</div>
      {state.join("") === passcode ? "Unlocked" : "Locked"}
    </div>
  );
}
