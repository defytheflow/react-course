import React from "react";

export default function BatchUpdateExample() {
  return (
    <div>
      <BatchUpdateSyncEventHandler />
      <hr />
      <BatchUpdateSyncEffect />
      <hr />
      <BatchUpdateAsyncEventHandler />
      <hr />
      <BatchUpdateAsyncEffect />
    </div>
  );
}

// react@17 - Does one rerender per multiple setState calls.
// react@18 - Does one rerender per multiple setState calls.
function BatchUpdateSyncEventHandler() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [about, setAbout] = React.useState("");

  function handleClick() {
    setName("Alice");
    setAge(25);
    setAbout("About me");
  }

  return (
    <div>
      <div>Render: {useRenderCount()}</div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>About: {about}</div>
      <button onClick={handleClick}>Update State Sync</button>
    </div>
  );
}

// react@17 - Does one rerender per multiple setState calls.
// react@18 - Does one rerender per multiple setState calls.
function BatchUpdateSyncEffect() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName("Alice");
    setAge(25);
    setAbout("About me");
  }, []);

  return (
    <div>
      <div>Render: {useRenderCount()}</div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>About: {about}</div>
    </div>
  );
}

// react@17 - Does a rerender per each setState call.
// react@18 - Does one rerender per multiple setState calls.
function BatchUpdateAsyncEventHandler() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [about, setAbout] = React.useState("");

  function handleClickAsync() {
    Promise.resolve().then(() => {
      setName("Alice");
      setAge(25);
      setAbout("About me");
    });
  }

  return (
    <div>
      <div>Render: {useRenderCount()}</div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>About: {about}</div>
      <button onClick={handleClickAsync}>Update State Async</button>
    </div>
  );
}

// react@17 - Does a rerender per each setState call.
// react@18 - Does one rerender per multiple setState calls.
function BatchUpdateAsyncEffect() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      setName("Alice");
      setAge(25);
      setAbout("About me");
    }, 1000);
  }, []);

  return (
    <div>
      <div>Render: {useRenderCount()}</div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>About: {about}</div>
    </div>
  );
}

function useRenderCount() {
  const count = React.useRef(0);
  count.current++;
  return count.current;
}
