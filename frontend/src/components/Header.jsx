import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "../styles/Header.css";
import logoQuiz from "../assets/logoQuiz.png";

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
      <div className="logo">
        <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" />
      </div>
      <h2>Quiz Prepara Aí 2025</h2>
      <div className="buttons">
        {/* <Link to="/quiz">
          <button className="btn-primary">Começar o Quiz</button>
        </Link> */}
        <Link to="/ranking">
          <button className="btn-secondary">Ver Ranking</button>
        </Link>
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </div>
      {/* <div className="buttons">
        <button className="btn-primary">Login</button>
        <button className="btn-secondary">Cadastrar</button>
      </div> */}
      {/* <nav className="nav">
        <ul>
          <li>
            <a href="/">Início</a>
          </li>
          <li>
            <a href="/quiz">Quiz</a>
          </li>
          <li>
            <a href="/ranking">Ranking</a>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}
