import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import logoQuiz from "../assets/logoQuiz.png";
import menuIcon from "../assets/menu-icon.svg";
import "../styles/Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  // Efeito para bloquear o scroll do body quando o menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Função de limpeza para garantir que o scroll seja reativado
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Função para fechar o menu, será usada em todos os links e botões
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    handleLinkClick(); // Fecha o menu
    logout(); // Executa o logout
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/home" className="logo" onClick={handleLinkClick}>
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" />
          <h2>Prepara Aí</h2>
        </Link>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <div className="nav-buttons">
            <Link to="/home" className="btn-primary" onClick={handleLinkClick}>
              Início
            </Link>
            <Link
              to="/ranking"
              className="btn-secondary"
              onClick={handleLinkClick}
            >
              Ranking
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          </div>
        </nav>

        <button
          className="hamburger"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={menuIcon} alt="" />
        </button>
      </div>
    </header>
  );
}
