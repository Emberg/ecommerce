import { Outlet } from "react-router";
import { AdminNav } from "../components/AdminNav";
// import "./../styles/layout.css";

export const AdminLayout = () => {
  return (
    <>
      <header>
        <AdminNav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};