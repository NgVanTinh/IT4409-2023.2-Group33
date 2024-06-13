import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import GetOtpPage from "../pages/GetOtpPage/GetOtpPage";
import Login from "../pages/Login/Login";
import Logout from "../pages/Logout/Logout";
import Register from "../pages/Register/Register";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import {
  Home,
  Cart,
  CategoryProduct,
  ProductSingle,
  Search,
} from "../pages/index";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductSingle />,
      },
      {
        path: "category/:category",
        element: <CategoryProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search/:searchKeyword",
        element: <Search />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "forgot-password",
    element: <GetOtpPage />,
  },
  {
    path: "reset-password/:email",
    element: <ResetPassword />,
  },
];