import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Login from "../pages/Login";
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

      // {
      //   path: "register",
      //   element: <Register />,
      // },
      // {
      //   path: "logout",
      //   element: <Logout />,
      // },
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
];
