import { createBrowserRouter } from "react-router-dom";

import {
  Layout,
  Login,
  Home,
  Clients,
  Staff,
  Members,
  Loan,
  Settings,
} from "../views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/staff",
        element: <Staff />,
      },
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/loan",
        element: <Loan />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
