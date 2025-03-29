import { Outlet } from "react-router";

export const CheckoutLayout = () => {
  return (
    <>
      <header>
      </header>
      <main>
          <Outlet />
      </main>
      <footer></footer>
    </>
  );
};