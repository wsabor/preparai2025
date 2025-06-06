const admin = require("firebase-admin");
const db = admin.firestore();

exports.getAll = async (req, res) => {
  try {
    const snapshot = await db.collection("perguntas").get();
    const perguntas = snapshot.docs.map((doc) => doc.data());
    res.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({ error: "Erro ao buscar perguntas" });
  }
};
