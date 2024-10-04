import { Component, useState } from 'react'
import './App.css'
import CounterReducer from './CounterReducer';
import TodoApp from './Todo-App/TodoApp';
import ContextEx from './ContextEx';

class ErrorBoundary extends Component {

  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error }  // setting the state
  }

  render() {
    const { error } = this.state;

    if (error) {
      // return <div>
      //   <pre>
      //     {error.message}
      //   </pre>
      // </div>

      return <this.props.fallbackComponent error={error} />
    } else {
      return this.props.children;
    }
  }
}

function FallbackComponent({ error }) {
  return (
    <div>
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function AppLevelFallbackComponent({ error }) {
  return (
    <div>
      <p style={{ color: "red", "font-size": "1em" }}>Application is down. Please try again after sometime.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function Breaker() {
  const [count, setCount] = useState(0);

  function onClickHandler() {
    setCount((prev) => {
      if (prev > 2) {
        throw new Error("Breaker Error Occurred!")
      }

      return prev + 1;
    })
  }

  return (
    <button onClick={onClickHandler}>{count}</button>
  )
}

function AnotherComponent() {
  return (<h2>I am Another Component.</h2>)
}

function App() {

  return (
    <>
      <ErrorBoundary fallbackComponent={AppLevelFallbackComponent}>
        <div>
          {/* <ErrorBoundary fallbackComponent={FallbackComponent}> */}
            {/* <Breaker /> */}
          {/* </ErrorBoundary> */}
          {/* <AnotherComponent></AnotherComponent> */}

          {/* <CounterReducer/> */}
          {/* <TodoApp /> */}

          <ContextEx></ContextEx>
        </div>
      </ErrorBoundary>
    </>
  )
}

export default App
