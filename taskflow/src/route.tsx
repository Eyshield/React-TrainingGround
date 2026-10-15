import AuthPage from "./features/Auth/AuthPage";

import { createBrowserRouter } from "react-router-dom";
import ManageUsers from "./features/Users/ManageUsers";
import ManageProject from "./features/Project/Pages/ManageProject";
import ProjectDetails from "./features/Project/Pages/ProjectDetails";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  { path: "/users", element: <ManageUsers /> },
  { path: "/projects/:id", element: <ProjectDetails /> },
  { path: "/projects", element: <ManageProject /> },
]);
