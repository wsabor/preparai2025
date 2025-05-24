import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>Desenvolvido por: Prof. Wagner Sabor</span>
        <span>Versão 1.0</span>
        <span>© {new Date().getFullYear()} Quiz Prepara Aí</span>{" "}
      </div>
    </footer>
  );
}
