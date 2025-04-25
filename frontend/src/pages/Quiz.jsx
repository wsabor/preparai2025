import { useEffect, useState } from "react";
import axios from "axios";

function Quiz() {
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/perguntas")
      .then((response) => setPerguntas(response.data))
      .catch((error) => console.error("Erro ao buscar perguntas", error));
  }, []);

  return (
    <div>
      <h1>Quiz</h1>
      {perguntas.map((pergunta, index) => (
        <div key={index}>
          <p>{pergunta.pergunta}</p>
          {pergunta.opcoes.map((opcao, i) => (
            <button key={i}>{opcao}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Quiz;
