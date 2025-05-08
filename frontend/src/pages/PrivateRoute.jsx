import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // ← verifique este caminho
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/" />; // volta ao login
  return children;
}
