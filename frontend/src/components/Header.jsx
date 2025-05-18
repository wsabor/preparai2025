import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import logoQuiz from "../assets/logoQuiz.png";
import menuIcon from "../assets/menu-icon.svg";
import "../styles/Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
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
          <h2>Prepara Aí 2025</h2>
        </div>

        <nav className={`nav ${open ? "open" : ""}`}>
          <div className="buttons">
            <Link to="/home">
              <button className="btn-primary">Início</button>
            </Link>
            <Link to="/ranking">
              <button className="btn-secondary">Ranking</button>
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          </div>
        </nav>

        {/* hamburger, escondido por padrão */}
        <button
          className="hamburger"
          aria-label="Abrir menu"
          onClick={() => setOpen(!open)}
        >
          <img src={menuIcon} alt="Menu" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}
