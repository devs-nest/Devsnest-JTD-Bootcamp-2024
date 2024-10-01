import React from "react";
import useLocalStorage from "./use-localstorage";

export default function Header() {
  const [username] = useLocalStorage("username");

  return <div>{username ? `Welcome ${username}` : "Please login"}</div>;
}
