import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logoQuiz from "../assets/logoQuiz.png";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { loginWithEmail, loginWithGoogle, error, loading, clearError } =
    useAuth();

  useEffect(() => {
    return () => {
      clearError(); // Limpa o erro quando o componente é desmontado
    };
  }, [clearError]);

  const handleLoginEmailSenha = async (e) => {
    e.preventDefault();
    clearError(); // Limpa erro anterior antes de tentar novamente
    await loginWithEmail(email, senha);
  };

  const handleLoginGoogle = async () => {
    clearError();
    await loginWithGoogle();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* ... seu JSX ... */}
        <div className="auth-header">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" className="logo" />
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLoginEmailSenha} className="auth-form">
          {/* ... inputs ... */}
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
          {error && <p className="erro">{error}</p>}{" "}
          {/* Usando o erro do hook */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {" "}
            {/* Adicionado disabled={loading} */}
            {loading ? "Entrando..." : "Entrar com e-mail"}
          </button>
        </form>
        <p>
          Ainda não tem conta? <Link to="/signup">Cadastre-se</Link>
        </p>
        <div className="divisor">ou</div>
        <button
          onClick={handleLoginGoogle}
          className="btn-secondary"
          disabled={loading}
        >
          {" "}
          {/* Adicionado disabled={loading} */}
          {loading ? "Aguarde..." : "Entrar com Google"}
        </button>
      </div>
    </div>
  );
}
