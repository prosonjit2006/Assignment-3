import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Wrapper from "../layout/Wrapper";
import Dashboard from "../pages/Dashboard";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default Routes;
