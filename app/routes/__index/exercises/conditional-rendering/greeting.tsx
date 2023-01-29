import React from "react";

// https://reactjs.org/docs/conditional-rendering.html
export default function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const toggleStatus = () => setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);

  return (
    <div>
      <div>
        The user is <b>{isLoggedIn ? "currently" : "not"}</b> logged in.
      </div>
      <button onClick={toggleStatus}>{isLoggedIn ? "Log out" : "Log in"}</button>
    </div>
  );
}
