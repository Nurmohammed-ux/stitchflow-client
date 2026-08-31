import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Loading from "../components/Loading/Loading";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Booking from "../pages/Booking/Booking";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import DashboardAllProducts from "../pages/Dashboard/DashboardAllProducts/DashboardAllProducts";
import AllOrders from "../pages/Dashboard/AllOrders/AllOrders";
import OrderDetails from "../pages/Dashboard/OrderDetails/OrderDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Contact from "../pages/Contact/Contact";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <Loading />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "booking/:id",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />
      }
    ],
  },
  // Authentication
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // Dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "all-products",
        element: <DashboardAllProducts />,
      },
      {
        path: "all-orders",
        element: <AllOrders />,
      },
      {
        path: "order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "manage-products",
        element: <ManageProducts />
      },
      {
        path: "pending-orders",
        element: <PendingOrders />
      }
    ],
  },
]);

export default router;
