import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Login from "./pages/Login";
import ProfilUI from "./pages/profil/ProfilUI";
import AccountDetailsUI from "./AccountDetailsUI";
import Footer from "./layout/Footer";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profil",
        element: <ProfilUI />,
      },
      {
        path: "account/:accountName",
        element: <AccountDetailsUI />,
      },
    ],
  },
]);
