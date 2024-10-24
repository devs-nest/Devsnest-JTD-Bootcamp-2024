import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, LoaderFunctionArgs, redirect, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import Layout from "./components/ui/layout.tsx";
import { DashboardLoader, DashboardSkeleton, loader } from "./pages/dashboard.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import { getStoredValue } from "./lib/utils.ts";

const Payment = lazy(() => import("./pages/payment.tsx"));
const Dashboard = lazy(() => import("./pages/dashboard.tsx"));
const Cart = lazy(() => import("./pages/cart.tsx"));
const ProductInfo = lazy(() => import("./pages/product.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardLoader>
              <Dashboard />
            </DashboardLoader>
          </Suspense>
        ),
        loader: loader,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/product/:productId",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <ProductInfo />
          </Suspense>
        ),
        async loader({ params }) {
          let { loader } = await import("./pages/product.tsx");
          return loader({ params } as LoaderFunctionArgs<{ productId: string }>);
        },
      },
      {
        path: "payment",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Payment />
          </Suspense>
        ),
        loader: () => {
          const user = getStoredValue("user");
          if (!user) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
