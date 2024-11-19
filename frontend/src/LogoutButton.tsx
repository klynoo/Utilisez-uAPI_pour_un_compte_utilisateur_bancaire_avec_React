import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;
