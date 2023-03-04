import { createBrowserRouter } from "react-router-dom";

import { Layout, Login, Home, Clients } from "../views";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
