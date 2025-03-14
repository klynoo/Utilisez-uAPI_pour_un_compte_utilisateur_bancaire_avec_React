import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserProfile } from "../api/apiService";
import { login } from "../store";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const useLoginLogic = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    credentials: LoginCredentials
  ): Promise<string | null> => {
    try {
      const loginResponse = await loginUser({
        email: credentials.email,
        password: credentials.password,
      });

      const token = loginResponse.body?.token;
      if (!token) {
        return "Impossible de récupérer le token : vérifie la réponse du serveur.";
      }

      const profileResponse = await getUserProfile(token);
      const userData = {
        firstName: profileResponse.body.firstName,
        lastName: profileResponse.body.lastName,
        email: profileResponse.body.email,
      };

      dispatch(
        login({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          token,
        })
      );

      navigate("/profil");
      return null;
    } catch (error: any) {
      console.error("Erreur handleLogin :", error);
      return (
        error.response?.data?.message ||
        "Adresse email ou mot de passe incorrect."
      );
    }
  };

  return { handleLogin };
};
