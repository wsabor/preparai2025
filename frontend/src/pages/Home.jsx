import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

export default function Home() {
  const { logout } = useAuth();

  return (
    <>
      <Header />
      {/* Usando o wrapper global para garantir consistência de layout e tema */}
      <main className="page-content-wrapper">
        <div className="home-content">
          <h1>Bem-vindo ao Quiz "Prepara Aí – 2025"</h1>
          <h2>Teste seus conhecimentos e se prepare para o ENEM!</h2>

          <div className="home-buttons">
            <Link to="/quiz" className="btn-primary">
              Começar o Quiz
            </Link>
            <Link to="/ranking" className="btn-secondary">
              Ver Ranking
            </Link>
            {/* Melhoria semântica: Ação de 'Sair' é melhor representada por um botão */}
            <button onClick={logout} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
