const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializando o Firebase Admin SDK
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Rota para obter perguntas
app.get("/api/perguntas", async (req, res) => {
  try {
    const snapshot = await db.collection("perguntas").get();
    const perguntas = snapshot.docs.map((doc) => doc.data());
    res.json(perguntas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perguntas" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
