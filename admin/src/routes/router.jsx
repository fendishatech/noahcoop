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
  Cities,
  NewCity,
  EditCity,
  SubCities,
  NewSubCity,
  EditSubCity,
} from "../views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
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
      // city routes
      {
        path: "/cities",
        element: <Cities />,
      },
      {
        path: "/new_city",
        element: <NewCity />,
      },
      {
        path: "/edit_city/:id",
        element: <EditCity />,
      },
      // subCity routes
      {
        path: "/sub_cities",
        element: <SubCities />,
      },
      {
        path: "/new_sub_city",
        element: <NewSubCity />,
      },
      {
        path: "/edit_sub_city/:id",
        element: <EditSubCity />,
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
