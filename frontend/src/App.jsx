import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Ranking from "./pages/Ranking";
import "./App.css";

function AppContent() {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!currentUser ? <Login /> : <Navigate to="/home" replace />}
      />
      <Route
        path="/signup"
        element={!currentUser ? <SignUp /> : <Navigate to="/home" replace />}
      />
      <Route
        path="/home"
        element={currentUser ? <Home /> : <Navigate to="/" replace />}
      />
      <Route
        path="/quiz"
        element={currentUser ? <Quiz /> : <Navigate to="/" replace />}
      />
      <Route path="/ranking" element={<Ranking />} replace />
      <Route
        path="*"
        element={<Navigate to={currentUser ? "/home" : "/"} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
