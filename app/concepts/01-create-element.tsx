import React from "react";

function Ex0() {
  const element = {
    $$typeof: Symbol.for("react.element"),
    type: "h1",
    key: null,
    ref: null,
    props: { className: "greeting", children: "Hello, World!" },
  };
  return element;
}

function Ex1() {
  const element = React.createElement("h1", {
    className: "greeting",
    children: "Hello, world!",
  });
  return element;
}

function Ex2() {
  const element = React.createElement("h1", { className: "greeting" }, "Hello, World!");
  return element;
}

function Ex3() {
  const element = <h1 className="greeting">Hello, world!</h1>;
  return element;
}

export { Ex0, Ex1, Ex2, Ex3 };
