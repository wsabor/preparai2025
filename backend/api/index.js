const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  try {
    // LEIA DA VARIÁVEL DE AMBIENTE NA VERCEL
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      throw new Error(
        "Variável de ambiente FIREBASE_SERVICE_ACCOUNT_JSON não definida."
      );
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar Firebase Admin SDK:", error.message);
  }
} else {
  console.log("Firebase Admin SDK já estava inicializado.");
}

const app = express(); // Crie uma nova instância do Express aqui

// --- Middlewares ---
app.use(
  cors({
    origin: process.env.FRONTEND_URL_DEPLOYED,
  })
);
app.use(express.json());

// --- Importando e Registrando Rotas ---
const perguntasRouter = require("../routes/perguntas");
const scoresRouter = require("../routes/scores");

// --- Registrando Rotas ---
// AGORA MONTAMOS O ROUTER PRINCIPAL COM O PREFIXO /api
const apiRouter = express.Router(); // Crie um novo router para o prefixo /api

// Use este apiRouter para suas rotas específicas
apiRouter.use("/perguntas", perguntasRouter);
apiRouter.use("/scores", scoresRouter);

// Rota de teste para o /api/ (se quiser)
apiRouter.get("/", (req, res) => {
  res
    .status(200)
    .send("API do Quiz Prepara Aí (dentro de /api) está funcionando!");
});

// Monte o apiRouter no caminho raiz do app Express.
// Como o vercel.json já direciona tudo que começa com /api para esta função,
// e o Express recebe o caminho completo, precisamos que o Express também espere /api.
app.use("/api", apiRouter); // <<< MUDANÇA IMPORTANTE AQUI

// Rota de fallback ou para a raiz do domínio (se acessado sem /api)
// Isso provavelmente não será alcançado com o rewrite "/api/(.*)"
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Servidor base está funcionando, mas a API está em /api.");
});

module.exports = app;
