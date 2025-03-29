import { Outlet } from "react-router";
import { Cart } from "./Cart";
// import "./../styles/layout.css";

export const StoreLayout = () => {
  return (
    <>
      <header>
      </header>
      <main>
        <div style={{display:"flex", marginLeft:"200px", justifyContent:"space-between"}}>
          <Outlet />
          <Cart />
        </div>
      </main>
      <footer></footer>
    </>
  );
};