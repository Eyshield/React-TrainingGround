import "./App.css";
import { route } from "./route";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={route} />;
}

export default App;
