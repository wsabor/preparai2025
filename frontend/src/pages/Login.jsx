import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // 3.1 — Login com e-mail/senha
  const handleLoginEmailSenha = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/home"); // redireciona ao sucesso
    } catch {
      setErro("Usuário ou senha inválidos.");
    }
  };

  // 3.2 — Login com Google
  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch {
      setErro("Erro ao fazer login com Google.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLoginEmailSenha} className="login-form">
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
        {erro && <p className="erro">{erro}</p>}
        <button type="submit">Entrar com E-mail</button>
      </form>
      <div className="divisor">ou</div>
      <button onClick={handleLoginGoogle} className="google-button">
        Entrar com Google
      </button>
    </div>
  );
}
