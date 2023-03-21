import { createBrowserRouter } from "react-router-dom";

import {
  Layout,
  Login,
  Home,
  Staff,
  Loan,
  Settings,
  NotFound,
  Clients,
  NewClient,
  EditClient,
  Members,
  NewMember,
  EditMember,
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
        path: "/new_client",
        element: <NewClient />,
      },
      {
        path: "/edit_client/:id",
        element: <EditClient />,
      },
      // member routes
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/new_member",
        element: <NewMember />,
      },
      {
        path: "/edit_member/:id",
        element: <EditMember />,
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
