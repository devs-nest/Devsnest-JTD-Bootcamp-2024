import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';
import Dashboard, { dashboardDataLoader } from './Dashboard.jsx';
import About from './About.jsx';
import ErrorPage from './ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "dashboard/:contextId",
        element: <Dashboard />,
        loader: dashboardDataLoader
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}


    <RouterProvider router={router}></RouterProvider>

    {/* <TodoApp></TodoApp> */}
  </StrictMode>,
)
