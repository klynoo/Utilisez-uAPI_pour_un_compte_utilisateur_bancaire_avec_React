import { useDispatch } from "react-redux";
import { login } from "../store"; // Action Redux
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export interface LoginCredentials {
  email: string;
  password: string;
}

// Liste des utilisateurs autorisés
const authorizedUsers = [
  { email: "admin@example.com", password: "password123" },
  { email: "user1@example.com", password: "mypassword" },
];

// Logique de validation et gestion de connexion
export const useLoginLogic = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (credentials: LoginCredentials): string | null => {
    const user = authorizedUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Dispatch Redux et redirection
      dispatch(login({ email: user.email, name: user.email.split("@")[0] }));
      navigate("/profil");
      return null;
    } else {
      return "Adresse email ou mot de passe incorrect.";
    }
  };

  return { handleLogin };
};
