import LoginForm from "./features/Auth/components/LoginForm";
import { createBrowserRouter } from "react-router-dom";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
]);
