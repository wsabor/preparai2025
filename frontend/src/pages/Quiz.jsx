import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { saveScore, fetchPerguntas } from "../services/quizService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Quiz.css";

export default function Quiz() {
  const navigate = useNavigate();
  const [perguntas, setPerguntas] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [quizIniciado, setQuizIniciado] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [saveScoreError, setSaveScoreError] = useState(null);
  const [scoreSaved, setScoreSaved] = useState(false);

  const carregarPerguntas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPerguntas();
      if (data && data.length > 0) {
        setPerguntas(data);
      } else {
        setPerguntas([]);
        setError("Nenhuma pergunta encontrada. Tente novamente mais tarde.");
      }
    } catch (err) {
      console.error("Erro ao carregar perguntas:", err);
      setError(
        err.message ||
          "Falha ao carregar as perguntas. Verifique sua conexão e tente novamente."
      );
      setPerguntas([]);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback não precisa de dependências se fetchPerguntas não mudar

  // Carrega as perguntas na montagem inicial do componente
  useEffect(() => {
    carregarPerguntas();
  }, [carregarPerguntas]);

  // Salva o score
  useEffect(() => {
    if (quizFinalizado) {
      const user = auth.currentUser;
      if (user) {
        setIsSavingScore(true);
        setScoreSaved(false);
        setSaveScoreError(null);
        const nome = user.displayName || user.email;
        saveScore({ name: nome, email: user.email }, acertos)
          .then(() => {
            console.log("Score salvo com sucesso!");
            setScoreSaved(true);
          })
          .catch((err) => {
            console.error("Erro ao salvar score:", err);
            setSaveScoreError(
              "Falha ao salvar seu score. Tente novamente mais tarde."
            );
          })
          .finally(() => {
            setIsSavingScore(false);
          });
      } else {
        console.warn("Usuário não autenticado. Score não será salvo.");
      }
    }
  }, [quizFinalizado, acertos]);

  // Iniciar Quiz
  const iniciarQuiz = () => {
    setIndexAtual(0);
    setRespostaSelecionada(null);
    setAcertos(0);
    setQuizFinalizado(false);
    setError(null); // Você já tem este

    // Resetar estados de feedback do score
    setIsSavingScore(false);
    setScoreSaved(false);
    setSaveScoreError(null);

    setLoading(true);
    carregarPerguntas().then(() => {
      setQuizIniciado(true);
    });
  };

  // Função que trata as respostas
  const responder = (opcao) => {
    if (respostaSelecionada) return;
    setRespostaSelecionada(opcao);

    if (opcao === perguntas[indexAtual].correta) {
      setAcertos((prevAcertos) => prevAcertos + 1);
    }

    setTimeout(() => {
      const proxima = indexAtual + 1;
      if (proxima < perguntas.length) {
        setIndexAtual(proxima);
        setRespostaSelecionada(null);
      } else {
        setQuizFinalizado(true);
      }
    }, 1000);
  };

  // Renderiza o conteúdo do Quiz
  const renderContent = () => {
    if (!quizIniciado) {
      return (
        <div className="tela-inicial">
          <h1>Você está preparado para o ENEM?</h1>
          <h2>Clique no botão abaixo e teste seus conhecimentos!</h2>
          <button
            onClick={iniciarQuiz}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Carregando..." : "🎯 Iniciar Quiz"}
          </button>
          {error && <p className="erro-mensagem">{error}</p>}
        </div>
      );
    }
    if (loading) {
      return (
        <div className="quiz-container">
          <p>Carregando perguntas...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="quiz-container">
          <p className="erro-mensagem">{error}</p>
          <button onClick={carregarPerguntas} className="btn-primary">
            Tentar Novamente
          </button>
        </div>
      );
    }
    if (perguntas.length === 0 && !loading) {
      return (
        <div className="quiz-container">
          <p>Nenhuma pergunta disponível no momento.</p>
        </div>
      );
    }
    if (quizFinalizado) {
      return (
        <div className="tela-inicial">
          <h1>Quiz Finalizado!</h1>
          <h2>
            Você acertou {acertos} de {perguntas.length} perguntas!
          </h2>
          {isSavingScore && <p>Salvando sua pontuação...</p>}
          {scoreSaved && (
            <p style={{ color: "green" }}>Pontuação salva com sucesso!</p>
          )}
          {saveScoreError && <p className="erro-mensagem">{saveScoreError}</p>}
          <div className="home-buttons">
            <button onClick={iniciarQuiz} className="btn-primary">
              Jogar Novamente
            </button>
            <button
              onClick={() => navigate("/ranking")}
              className="btn-secondary"
            >
              Ver Ranking
            </button>
          </div>
        </div>
      );
    }
    // Quiz em Andamento
    const perguntaAtual = perguntas[indexAtual];
    return (
      <div className="quiz-container">
        <h2>
          Questão {indexAtual + 1} de {perguntas.length}
        </h2>
        <p className="pergunta-texto">{perguntaAtual.pergunta}</p>
        <ul className="lista-opcoes">
          {perguntaAtual.opcoes.map((opcao, i) => {
            let classesAdicionais = "";
            if (respostaSelecionada) {
              if (opcao === perguntaAtual.correta) {
                classesAdicionais = "opcao-correta";
              } else if (opcao === respostaSelecionada) {
                classesAdicionais = "opcao-incorreta";
              }
            }
            return (
              <li
                key={i} // Se 'opcao' for única, key={opcao} pode ser melhor
                onClick={() => responder(opcao)}
                className={`opcao-resposta ${classesAdicionais} ${
                  respostaSelecionada ? "opcao-disabled" : ""
                }`} // Adiciona 'opcao-disabled' para evitar cliques após seleção
                aria-disabled={!!respostaSelecionada}
              >
                {opcao}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="page-content-wrapper">{renderContent()}</div>
      <Footer />
    </>
  );
}
