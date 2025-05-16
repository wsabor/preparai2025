import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
import "../styles/Home.css";

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
      <Header />
      <h1>Bem-vindo ao Quiz “Prepara Aí – 2025”</h1>
      <h2>Teste seus conhecimentos e se prepare para o ENEM!</h2>

      <div className="home-buttons">
        <Link to="/quiz">
          <button className="btn-primary">Começar o Quiz</button>
        </Link>
        <Link to="/ranking">
          <button className="btn-secondary">Ranking</button>
        </Link>
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}
