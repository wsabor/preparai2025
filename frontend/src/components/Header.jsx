import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import logoQuiz from "../assets/logoQuiz.png";
import "../styles/Header.css";

export default function Header() {
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
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" />
          <h1>Quiz Prepara Aí 2025</h1>
        </div>
        <div className="buttons">
          <Link to="/home">
            <button className="btn-primary">Início</button>
          </Link>
          <Link to="/ranking">
            <button className="btn-secondary">Ver Ranking</button>
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
