// src/pages/Quiz.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebaseConfig";
import { saveScore } from "../services/quizService";
import "../App.css";
import "../styles/Quiz.css";

export default function Quiz() {
  const [perguntas, setPerguntas] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [quizIniciado, setQuizIniciado] = useState(false);

  // 1. Carrega as perguntas apenas uma vez
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

  // 2. Dispara o saveScore **uma vez** quando quizFinalizado virar true
  useEffect(() => {
    if (quizFinalizado) {
      const user = auth.currentUser;
      const nome = user.displayName || user.email; // exibe email se não houver nome
      saveScore({ name: nome, email: user.email }, acertos)
        .then(() => console.log("Score salvo"))
        .catch(console.error);
    }
  }, [quizFinalizado, acertos]);

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
    // Recarrega perguntas
    async function recarregar() {
      const res = await axios.get("http://localhost:3000/api/perguntas");
      setPerguntas(res.data);
    }
    recarregar();
  };

  // 3. Função única de resposta
  const responder = (opcao) => {
    // evita clicar novamente
    if (respostaSelecionada) return;
    setRespostaSelecionada(opcao);

    if (opcao === perguntas[indexAtual].correta) {
      setAcertos((a) => a + 1);
    }

    setTimeout(() => {
      const proxima = indexAtual + 1;
      if (proxima < perguntas.length) {
        setIndexAtual(proxima);
        setRespostaSelecionada(null);
      } else {
        setQuizFinalizado(true);
      }
    }, 800);
  };

  // 4. Renderização condicional
  if (!quizIniciado) {
    return (
      <div className="tela-inicial">
        <h1>Bem-vindo ao Quiz “Prepara Aí – 2025”</h1>
        <p>Teste seus conhecimentos e se prepare para o ENEM!</p>
        <button onClick={iniciarQuiz} className="botao-iniciar">
          🎯 Iniciar Quiz
        </button>
      </div>
    );
  }

  if (perguntas.length === 0) {
    return <p>Carregando perguntas...</p>;
  }

  if (quizFinalizado) {
    return (
      <div className="quiz-end">
        <h2>
          Você acertou {acertos} de {perguntas.length} perguntas!
        </h2>
        <button onClick={reiniciarQuiz} className="botao-reiniciar">
          🔁 Voltar para o início
        </button>
        <button
          onClick={() => (window.location.href = "/ranking")}
          className="botao-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }

  const perguntaAtual = perguntas[indexAtual];
  return (
    <div className="quiz-container">
      <h3>
        Questão {indexAtual + 1} de {perguntas.length}
      </h3>
      <p className="pergunta-texto">{perguntaAtual.pergunta}</p>
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
}
