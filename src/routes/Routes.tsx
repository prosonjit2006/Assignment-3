import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Wrapper from "../layout/Wrapper";
import FormOptimize from "../pages/formOptimizer/FormOptimize";
import Stopwatch from "../pages/stopwatch/Stopwatch";
import Login from "../pages/studentManagement/Login";
import Signup from "../pages/studentManagement/Signup";
import StudentManagementWrapper from "../layout/studentManagement/StudentManagementWrapper";
import AdminWrapper from "../layout/studentManagement/admin/AdminWrapper";
import StudentWrapper from "../layout/studentManagement/student/StudentWrapper";
// import Dashboard from "../pages/studentManagement/admin/Dashboard";
const Dashboard = lazy(
  () => import("../pages/studentManagement/admin/Dashboard"),
);
// import StudentAdd from "../pages/studentManagement/admin/StudentAdd";
// import StudentEdit from "../pages/studentManagement/admin/StudentEdit";
import Profile from "../pages/studentManagement/student/Profile";
import { lazy, Suspense } from "react";
import StudentDashboard from "../pages/studentManagement/student/StudentDashboard";
import StudentList from "../pages/studentManagement/admin/StudentList";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        // path: "formoptimizar",
        path: "/",
        element: <FormOptimize />,
      },
      {
        path: "stopwatch",
        element: <Stopwatch />,
      },
    ],
  },
  {
    path: "/studentmanagement",
    element: <StudentManagementWrapper />,
    children: [
      {
        // index: true,
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<p className="text-red-500">Loading...</p>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "studentlist",
            element: <StudentList />,
          },
          // {
          //   path: "add",
          //   element: <StudentAdd />,
          // },
          // {
          //   path: "edit",
          //   element: <StudentEdit />,
          // },
        ],
      },
      {
        path: "student",
        element: <StudentWrapper />,
        children: [
          {
            path: "dashboard",
            element: <StudentDashboard />,
          },
          {
            // index: true,
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default Routes;
