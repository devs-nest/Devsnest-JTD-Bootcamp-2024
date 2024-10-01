import React, { StrictMode, Fragment } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StopWatch from "./stopwatch.jsx";
import Gallery from "./gallery.jsx";
import Login from "./login.jsx";
import Header from "./header.jsx";

const firstElement = React.createElement("div", {
  className: "container",
  children: React.createElement("span", null, "Hiii, Everyone.", "How are you doing"),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Fragment> */}
    {/* <div className="container">
      <span children={<p>Hiii, Everyone.</p>}></span>
    </div> */}
    {firstElement}
    {/* <Login />
      <Header />
    </Fragment> */}
  </StrictMode>
);
