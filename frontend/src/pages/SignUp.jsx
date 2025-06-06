import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import logoQuiz from "../assets/logoQuiz.png";
import "../styles/Auth.css";

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
    <div className="auth-page">
      {" "}
      <div className="auth-card">
        {" "}
        <div className="auth-header">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" className="logo" />
          <h1>Cadastro</h1>
        </div>
        <form onSubmit={handleSignUp} className="auth-form">
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
          {error && <p className="erro">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {" "}
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
