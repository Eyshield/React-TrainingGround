import AuthPage from "./features/Auth/AuthPage";

import { createBrowserRouter } from "react-router-dom";
import ManageUsers from "./features/Users/ManageUsers";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  { path: "/users", element: <ManageUsers /> },
]);
