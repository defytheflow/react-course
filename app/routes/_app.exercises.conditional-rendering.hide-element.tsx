import useToggle from "~/utils/use-toggle";

export default function HideElement() {
  const [show, toggle] = useToggle(true);
  return (
    <div>
      <button onClick={toggle}>{`${show ? "Hide" : "Show"} Element Below`}</button>
      {show && (
        <div
          style={{
            marginTop: 5,
            backgroundColor: "royalblue",
            textAlign: "center",
            color: "white",
            padding: 5,
            borderRadius: 5,
          }}
        >
          Element
        </div>
      )}
    </div>
  );
}
