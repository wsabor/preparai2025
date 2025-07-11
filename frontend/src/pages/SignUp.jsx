import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Adicionado para o link de volta
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout"; // Importa o novo layout

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const { signUpWithEmail, error, loading, clearError } = useAuth();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signUpWithEmail(email, senha, nome);
  };

  return (
    <AuthLayout title="Cadastro">
      <form onSubmit={handleSignUp} className="auth-form">
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
          placeholder="Senha (mínimo 6 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength="6"
        />
        {error && <p className="erro-mensagem">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p className="link-wrapper">
        Já possui uma conta? <Link to="/login">Faça o login</Link>
      </p>
    </AuthLayout>
  );
}
