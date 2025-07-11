import logoQuiz from "../assets/logoQuiz.png";
import "../styles/Auth.css"; // O estilo será aplicado aqui

// Este componente recebe um título e o conteúdo do formulário (children)
const AuthLayout = ({ title, children }) => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logoQuiz} alt="Logo do Quiz Prepara Aí" className="logo" />
          <h1>{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
