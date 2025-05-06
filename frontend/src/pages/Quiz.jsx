import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [quizIniciado, setQuizIniciado] = useState(false);

  useEffect(() => {
    async function carregarPerguntas() {
      try {
        const res = await axios.get("http://localhost:3000/api/perguntas");
        setPerguntas(res.data);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    }
    carregarPerguntas();
  }, []);

  const iniciarQuiz = () => {
    setQuizIniciado(true);
  };

  const reiniciarQuiz = () => {
    setPerguntas([]);
    setIndexAtual(0);
    setRespostaSelecionada(null);
    setAcertos(0);
    setQuizFinalizado(false);
    setQuizIniciado(false);

    // Recarrega as perguntas
    async function carregarNovamente() {
      const res = await axios.get("http://localhost:3000/api/perguntas");
      setPerguntas(res.data);
    }
    carregarNovamente();
  };

  const responder = (opcao) => {
    setRespostaSelecionada(opcao);

    if (opcao === perguntas[indexAtual].correta) {
      setAcertos(acertos + 1);
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

  if (!quizIniciado) {
    return (
      <div className="tela-inicial">
        <h1>Bem-vindo ao Quiz "Prepara Aí – 2025"</h1>
        <p>Teste seus conhecimentos e se prepare para o ENEM!</p>
        <button onClick={iniciarQuiz} className="botao-iniciar">
          🎯 Iniciar Quiz
        </button>
      </div>
    );
  }

  if (perguntas.length === 0) return <p>Carregando perguntas...</p>;
  if (quizFinalizado) {
    return (
      <div>
        <h2>
          Você acertou {acertos} de {perguntas.length} perguntas!
        </h2>
        <button onClick={reiniciarQuiz} className="botao-reiniciar">
          🔁 Voltar para o início
        </button>
      </div>
    );
  }

  const perguntaAtual = perguntas[indexAtual];

  return (
    <div>
      <h2>{perguntaAtual.pergunta}</h2>
      <ul className="lista-opcoes">
        {perguntaAtual.opcoes.map((opcao, i) => (
          <li
            key={i}
            onClick={() => responder(opcao)}
            className={`opcao-resposta ${
              respostaSelecionada
                ? opcao === perguntaAtual.correta
                  ? "opcao-correta"
                  : opcao === respostaSelecionada
                  ? "opcao-incorreta"
                  : ""
                : ""
            }`}
          >
            {opcao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
