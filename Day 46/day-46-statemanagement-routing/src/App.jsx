import './App.css'
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Dashboard from './Dashboard';
import Layout from './Layout';
import Home from './Home';

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} index></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes> */}
      {/* <h1>Welcome to Routing in React.</h1> */}
      <Layout/>
    </>
  )
}

export default App
