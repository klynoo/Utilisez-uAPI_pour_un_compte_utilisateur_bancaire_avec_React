import { useDispatch } from "react-redux";
import { login } from "../store";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

const authorizedUsers = [
  {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    password: "password123",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    email: "steve@rogers.com",
    password: "password456",
  },
];

export const useLoginLogic = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (credentials: LoginCredentials): string | null => {
    const user = authorizedUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const storage = credentials.rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(userData));

      dispatch(login(userData));

      navigate("/profil");
      return null;
    } else {
      return "Adresse email ou mot de passe incorrect.";
    }
  };

  return { handleLogin };
};
