import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import logoQuiz from "../assets/logoQuiz.png";
import "../styles/SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState(""); // <- campo extra para displayName
  const [erro, setErro] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // 1 cria o usuário
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      // 2 atualiza o displayName
      await updateProfile(userCredential.user, { displayName: nome });
      // 3 redireciona
      navigate("/home");
    } catch (err) {
      setErro("Erro ao criar conta: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" className="logo" />
          <h1>Cadastro</h1>
        </div>
        <form onSubmit={handleSignUp} className="login-form">
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
          {erro && <p>{erro}</p>}
          <div className="divisor" />
          <button type="submit" className="btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
