import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>this is the header</header>
      <main>
        <Outlet />
      </main>
      <footer>this is the footer</footer>
    </>
  );
}
