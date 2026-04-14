import AuthPage from "./features/Auth/AuthPage";

import { createBrowserRouter } from "react-router-dom";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
]);
