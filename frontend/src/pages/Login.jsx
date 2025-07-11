import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout"; // Importa o novo layout

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { loginWithEmail, loginWithGoogle, error, loading, clearError } =
    useAuth();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleLoginEmailSenha = async (e) => {
    e.preventDefault();
    await loginWithEmail(email, senha);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLoginEmailSenha} className="auth-form">
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
        {error && <p className="erro-mensagem">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="divisor">ou</div>

      <button
        onClick={loginWithGoogle}
        className="btn-secondary"
        disabled={loading}
      >
        {loading ? "Aguarde..." : "Entrar com Google"}
      </button>

      <p className="link-wrapper">
        Ainda não tem conta? <Link to="/signup">Cadastre-se</Link>
      </p>
    </AuthLayout>
  );
}
