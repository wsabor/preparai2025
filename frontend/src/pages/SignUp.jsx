import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import logoQuiz from "../assets/logoQuiz.png";
import "../styles/SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState(""); // <- campo extra para displayName

  const { signUpWithEmail, error, loading, clearError } = useAuth();

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    clearError();
    if (nome.trim() === "") {
      // Validação simples para nome
      console.error("O nome é obrigatório.");
      // setFormError("O nome é obrigatório"); // Exemplo com estado local
      return;
    }
    await signUpWithEmail(email, senha, nome);
  };

  return (
    <div className="login-page">
      {" "}
      <div className="login-card">
        {" "}
        <div className="login-header">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" className="logo" />
          <h1>Cadastro</h1>
        </div>
        <form onSubmit={handleSignUp} className="login-form">
          {" "}
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {error && <p className="erro">{error}</p>} <div className="divisor" />
          <button type="submit" className="btn-primary" disabled={loading}>
            {" "}
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
