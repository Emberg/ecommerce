import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./pages/AdminLayout";
import { NotFound } from "./pages/NotFound";
import { ManageCustomers} from "./pages/ManageCustomers";
import { CreateCustomer} from "./pages/CreateCustomer";
import { UpdateCustomer } from "./pages/UpdateCustomer";
import { Store } from "./pages/Store";
import { ProductPage } from "./pages/ProductPage";
import { StoreLayout } from "./pages/StoreLayout";
import { AdminNavPage } from "./pages/AdminNavPage";
import { Checkout } from "./pages/Checkout";
import { CheckoutLayout } from "./pages/CheckoutLayour";
import { CheckoutComplete } from "./pages/CheckoutComplete";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Store />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      }
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/complete",
        element: <CheckoutComplete />,
      },
    ],
  },
  {
    path: "/admin",
      element: <AdminLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/admin/",
          element: <AdminNavPage />,
        },
        {
          path: "/admin/customers",
          element: <ManageCustomers />,
        },
        {
          path: "/admin/create-customer",
          element: <CreateCustomer />,
        },
        {
          path: "/admin/update-customer/:id",
          element: <UpdateCustomer />,
        }
      ],
  },
]);