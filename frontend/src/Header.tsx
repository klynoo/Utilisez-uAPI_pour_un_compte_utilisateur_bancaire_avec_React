import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, logout } from "./store";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <p>Vous n'êtes pas connecté.</p>
      )}
    </header>
  );
};

export default Header;
