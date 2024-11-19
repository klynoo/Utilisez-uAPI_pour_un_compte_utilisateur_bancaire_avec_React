import React, { useState } from "react";
import { useLoginLogic } from "./loginLogic"; // Importer la logique

const LoginUI: React.FC = () => {
  const { handleLogin } = useLoginLogic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = handleLogin({ email, password });
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Adresse email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginUI;
