import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "./use-localstorage";

export default function Login() {
  const [username, setUsername] = useLocalStorage("username", "");
  const usernameRef = useRef(null);
  useEffect(() => {
    if (username) {
      usernameRef.current.focus();
      usernameRef.current.value = username;
    }
  }, [username]);

  function handleSubmit(event) {
    event.preventDefault();
    const usernameValue = event.target.username.value;
    setUsername(usernameValue);
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="username">Username</label>
        <input ref={usernameRef} type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </fieldset>
    </form>
  );
}
