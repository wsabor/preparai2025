import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRanking } from "../services/quizService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Ranking.css";

export default function Ranking() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true); // Novo estado
  const [error, setError] = useState(null); // Para tratamento de erro (ver próximo ponto)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    fetchRanking()
      .then(setLista)
      .catch((err) => {
        console.error("Erro ao buscar ranking:", err);
        setError(
          "Não foi possível carregar o ranking. Tente novamente mais tarde."
        );
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="ranking">
          <h1>Top 10 Jogadores</h1>
          <p>Carregando ranking...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="ranking">
          <h1>Top 10 Jogadores</h1>
          <p className="erro-mensagem">{error}</p>
          {/* Opcional: Botão para tentar novamente */}
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchRanking()
                .then(setLista)
                .catch((error) => {
                  console.error("Erro ao buscar ranking:", error);
                  setError(
                    "Não foi possível carregar o ranking. Tente novamente mais tarde."
                  );
                })
                .finally(() => setLoading(false));
            }}
            className="btn-secondary"
          >
            Tentar Novamente
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="ranking">
        <h1>Top 10 Jogadores</h1>
        {lista.length === 0 && !loading && !error ? (
          <p>Nenhum jogador no ranking ainda. Seja o primeiro!</p>
        ) : (
          <ol className="ranking-list">
            {lista.map((item, idx) => (
              <li key={item.id || item.email || idx} className="ranking-item">
                {" "}
                <span className="posicao">{idx + 1}º</span>
                <span className="usuario">{item.name}</span>
                <span className="pontos">{item.pontos} pts</span>
              </li>
            ))}
          </ol>
        )}
        <button onClick={() => navigate("/home")} className="btn-primary">
          Voltar ao Início
        </button>
      </div>
      <Footer />
    </>
  );
}
