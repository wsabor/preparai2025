import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

export default function Home() {
  const { logout } = useAuth();

  return (
    <div className="home-container">
      <Header />
      <h1>Bem-vindo ao Quiz “Prepara Aí – 2025”</h1>
      <h2>Teste seus conhecimentos e se prepare para o ENEM!</h2>

      <div className="home-buttons">
        <Link to="/quiz" className="btn-primary">
          Começar o Quiz
        </Link>
        <Link to="/ranking" className="btn-secondary">
          Ranking
        </Link>
        <Link onClick={logout} className="btn-logout">
          Sair
        </Link>
      </div>
      <Footer />
    </div>
  );
}
