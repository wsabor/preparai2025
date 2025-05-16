const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

// Inicialize aqui, _antes_ de importar controllers/rotas
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(
  cors({
    origin: "*", // ou especifique seu IP/local, ex: "http://192.168.0.15:5173"
  })
);
app.use(express.json());

// Importando rotas
const perguntasRouter = require("./routes/perguntas");
const scoresRouter = require("./routes/scores");

// Registrando rotas
app.use("/api/perguntas", perguntasRouter);
app.use("/api/scores", scoresRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () =>
  console.log(`Servidor rodando em http://${HOST}:${PORT}`)
);
