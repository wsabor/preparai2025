import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRanking } from "../services/quizService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Ranking.css"; // Importa o CSS refatorado

// Componentes simples para UI de status (opcional, mas limpa o JSX)
const LoadingIndicator = () => <p>Carregando ranking...</p>;

const ErrorMessage = ({ message, onRetry }) => (
  <div className="ranking-container">
    <p className="erro-mensagem">{message}</p>
    <button onClick={onRetry} className="btn-secondary">
      Tentar Novamente
    </button>
  </div>
);

export default function Ranking() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Encapsulamos a lógica de fetch em uma função com useCallback
  const loadRanking = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRanking();
      setLista(data);
    } catch (err) {
      console.error("Erro ao buscar ranking:", err);
      setError(
        "Não foi possível carregar o ranking. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }, []); // Sem dependências, será criada apenas uma vez

  // Chama a função ao montar o componente
  useEffect(() => {
    loadRanking();
  }, [loadRanking]);

  // Função para renderizar o conteúdo principal
  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={loadRanking} />;
    }

    if (lista.length === 0) {
      return <p>Nenhum jogador no ranking ainda. Seja o primeiro!</p>;
    }

    return (
      <ol className="ranking-list">
        {lista.map((item, idx) => (
          <li key={item.id || idx} className="ranking-item">
            <span className="posicao">{idx + 1}º</span>
            <span className="usuario">{item.name}</span>
            <span className="pontos">{item.pontos} pts</span>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <>
      <Header />
      {/* Usando o wrapper global para consistência de layout e tema */}
      <main className="page-content-wrapper">
        <div className="ranking-container">
          <h1>Top 10 Jogadores</h1>
          {renderContent()}
          <button
            onClick={() => navigate("/home")}
            className="btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Voltar ao Início
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
