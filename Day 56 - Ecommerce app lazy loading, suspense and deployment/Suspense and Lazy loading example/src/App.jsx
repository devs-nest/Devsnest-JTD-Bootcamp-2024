import { Suspense, useEffect, useState, lazy } from "react";
import "./App.css";
import Counter from "./counter";

const Recipes = lazy(() => delayForDemo(import("./recipes")));

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      {!show ? (
        <>
          <Counter />
          <button onClick={() => setShow(true)}>Show recipes</button>
        </>
      ) : (
        <Suspense fallback={<p>Loading recipes...</p>}>
          <Recipes />
        </Suspense>
      )}
    </>
  );
}
export default App;
