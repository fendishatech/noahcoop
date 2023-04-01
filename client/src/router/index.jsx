import { createBrowserRouter } from "react-router-dom";
import { PublicLayout, Home } from "../views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
