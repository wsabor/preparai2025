import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export function useAuth() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Poderia adicionar um feedback para o usuário aqui também
    }
  };

  // Você pode adicionar outras funções relacionadas à auth aqui (login, currentUser, etc.)
  return { handleLogout };
}
