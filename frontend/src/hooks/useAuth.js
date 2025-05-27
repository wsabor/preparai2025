<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export function useAuth() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Poderia adicionar um feedback para o usuário aqui também
    }
  };

  // Você pode adicionar outras funções relacionadas à auth aqui (login, currentUser, etc.)
  return { handleLogout };
=======
// src/hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

// Função helper para traduzir códigos de erro do Firebase (opcional, mas útil)
const getFirebaseAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "O formato do e-mail é inválido.";
    case "auth/user-disabled":
      return "Este usuário foi desabilitado.";
    case "auth/user-not-found":
      return "Usuário não encontrado. Verifique o e-mail ou cadastre-se.";
    case "auth/wrong-password":
      return "Senha incorreta. Tente novamente.";
    case "auth/email-already-in-use":
      return "Este e-mail já está em uso por outra conta.";
    case "auth/weak-password":
      return "A senha é muito fraca. Use pelo menos 6 caracteres.";
    case "auth/operation-not-allowed":
      return "Operação não permitida. Contate o suporte.";
    // Adicione mais casos conforme necessário
    default:
      return "Ocorreu um erro inesperado. Tente novamente.";
  }
};

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearError = () => setError(null);

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error("Erro no login com email:", err);
      setError(getFirebaseAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      console.error("Erro no login com Google:", err);
      setError(getFirebaseAuthErrorMessage(err.code || "google-login-failed"));
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email, password, displayName) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      navigate("/home");
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError(getFirebaseAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // setLoading(true); // Opcional, logout é geralmente rápido
    // setError(null);
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      // setError("Erro ao sair. Tente novamente."); // Opcional, mostrar erro no logout
    } finally {
      // setLoading(false);
    }
  };

  // Poderia adicionar uma função para pegar o usuário atual, se necessário em outros lugares
  //const getCurrentUser = () => auth.currentUser;

  return {
    loginWithEmail,
    loginWithGoogle,
    signUpWithEmail,
    logout, // Renomeei handleLogout para logout para consistência
    error,
    loading,
    clearError, // Para limpar o erro manualmente, se necessário
    //currentUser: auth.currentUser, // Cuidado: isso não será reativo. Use onAuthStateChanged para isso.
  };
>>>>>>> 50c5d41c58512edc07032bc02946cafadfd923cc
}
