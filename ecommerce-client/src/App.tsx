import { RouterProvider } from "react-router";
import { router } from "./Router";
import './App.css'
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
        <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  )
}

export default App
