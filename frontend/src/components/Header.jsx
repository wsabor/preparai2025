import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import logoQuiz from "../assets/logoQuiz.png";
import menuIcon from "../assets/menu-icon.svg";
import "../styles/Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" />
          <h2>Prepara Aí 2025</h2>
        </div>

        <nav className={`nav ${open ? "open" : ""}`}>
          <div className="buttons">
            <Link to="/home" className="btn-primary">
              Início
            </Link>
            <Link to="/ranking" className="btn-secondary">
              Ranking
            </Link>
            <Link onClick={logout} className="btn-logout">
              Sair
            </Link>
          </div>
        </nav>

        {/* hamburger, escondido por padrão */}
        <button
          className="hamburger"
          aria-label={open ? "Fechar menu" : "Abrir menu"} // Dinâmico
          aria-expanded={open} // Adiciona estado de expansão
          onClick={() => setOpen(!open)}
        >
          <img src={menuIcon} alt="" width={24} height={24} />{" "}
          {/* alt="" é aceitável para ícones decorativos dentro de botões com aria-label */}
        </button>
      </div>
    </header>
  );
}
