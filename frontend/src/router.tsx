import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import LoginUI from "./login/LoginUI";
import Profil from "./Profil";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "login",
        element: <LoginUI />,
      },
      {
        path: "profil",
        element: <Profil />,
      },
    ],
  },
]);
