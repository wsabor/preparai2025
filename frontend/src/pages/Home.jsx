import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Quiz Prepara Aí!</h1>
      <p>Teste seus conhecimentos e se prepare para o ENEM!</p>
      <div className="home-buttons">
        <Link to="/quiz">
          <button className="std-button">Começar o Quiz</button>
        </Link>
        <Link to="/ranking">
          <button className="std-button">Ver Ranking</button>
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </div>
    </div>
  );
}
