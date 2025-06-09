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
// Ajuste os caminhos para serem relativos a este arquivo api/index.js
const perguntasRouter = require("../routes/perguntas");
const scoresRouter = require("../routes/scores");

// A Vercel vai servir este arquivo `api/index.js` no caminho `/api`
// Portanto, as rotas aqui devem ser relativas a `/api`
// Se você definir app.use('/perguntas', ...) aqui, a URL final será /api/perguntas
app.use("/perguntas", perguntasRouter);
app.use("/scores", scoresRouter);

// Rota de teste para verificar se a API base está funcionando
app.get("/", (req, res) => {
  res.status(200).send("API do Quiz Prepara Aí está funcionando!");
});

module.exports = app;
