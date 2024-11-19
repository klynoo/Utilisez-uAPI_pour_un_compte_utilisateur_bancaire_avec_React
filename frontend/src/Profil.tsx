import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Navigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface Result {
  id: string;
  email: string;
  data: string;
}

const Profil: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [results, setResults] = useState<Result[]>([]);

  // Simuler des données disponibles
  const allResults: Result[] = [
    { id: "1", email: "admin@example.com", data: "Résultat 1 de Admin" },
    { id: "2", email: "user1@example.com", data: "Résultat 1 de User1" },
    { id: "3", email: "admin@example.com", data: "Résultat 2 de Admin" },
  ];

  useEffect(() => {
    if (user) {
      // Filtrer les résultats par l'email utilisateur
      const userResults = allResults.filter(
        (result) => result.email === user.email
      );
      setResults(userResults);
    }
  }, [user]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <LogoutButton />
      <h2>Vos résultats :</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.data}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profil;
