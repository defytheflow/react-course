import React from "react";

export default function GreetingApp() {
  return (
    <div>
      <Greeting initialName="John" />
      <hr />
      <FeedbackForm />
    </div>
  );
}

// https://github.com/kentcdodds/react-hooks
function Greeting({ initialName = "" }: { initialName?: string }) {
  const [name, setName] = React.useState(initialName);

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input id="name" value={name} onChange={e => setName(e.target.value)} />
      </form>
      <div style={{ margin: "8px 0" }}>
        {name ? <strong>Hello, {name}!</strong> : "Please type your name"}
      </div>
      <button onClick={() => setName("")}>Reset</button>
    </div>
  );
}

// https://beta.reactjs.org/learn/state-a-components-memory
function FeedbackForm() {
  const [isSent, setIsSent] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(`Sending: "${message}"`);
    setIsSent(true);
  }

  if (isSent) {
    return <h1>Thank you!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
