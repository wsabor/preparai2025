// src/pages/Quiz.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebaseConfig";
import { saveScore } from "../services/quizService";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
        // pega automaticamente o host de quem está acessando
        const host = window.location.hostname;
        const res = await axios.get(`http://${host}:3000/api/perguntas`);
        setPerguntas(res.data);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    }
    carregarPerguntas();
  }, []);

  // useEffect(() => {
  //   async function carregarPerguntas() {
  //     try {
  //       const res = await axios.get("http://localhost:3000/api/perguntas");
  //       setPerguntas(res.data);
  //     } catch (error) {
  //       console.error("Erro ao carregar perguntas:", error);
  //     }
  //   }
  //   carregarPerguntas();
  // }, []);

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
      const res = await axios.get("http://0.0.0.0:3000/api/perguntas");
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
      <>
        <Header />
        <div className="tela-inicial">
          <h1>Bem-vindo ao Quiz “Prepara Aí – 2025”</h1>
          <h2>Teste seus conhecimentos e se prepare para o ENEM!</h2>
          <button onClick={iniciarQuiz} className="btn-primary">
            🎯 Iniciar Quiz
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (perguntas.length === 0) {
    return <p>Carregando perguntas...</p>;
  }

  if (quizFinalizado) {
    return (
      <>
        <Header />
        <div className="tela-inicial">
          <h1>Quiz Finalizado!</h1>
          <h2>
            Você acertou {acertos} de {perguntas.length} perguntas!
          </h2>
          <div className="home-buttons">
            <button onClick={reiniciarQuiz} className="btn-primary">
              Voltar ao início
            </button>
            <button
              onClick={() => (window.location.href = "/ranking")}
              className="btn-secondary"
            >
              Ver Ranking
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const perguntaAtual = perguntas[indexAtual];
  return (
    <>
      <Header />
      <div className="quiz-container">
        <h2>
          Questão {indexAtual + 1} de {perguntas.length}
        </h2>
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
      <Footer />
    </>
  );
}
