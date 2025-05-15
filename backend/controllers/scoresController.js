const admin = require("firebase-admin");
const db = admin.firestore();

exports.create = async (req, res) => {
  try {
    const { user, pontos } = req.body;
    await db
      .collection("scores")
      .add({ ...user, pontos, timestamp: Date.now() });
    res.status(201).json({ message: "Score salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar score:", error);
    res.status(500).json({ error: "Erro ao salvar score" });
  }
};

exports.listTop = async (req, res) => {
  try {
    const snapshot = await db
      .collection("scores")
      .orderBy("pontos", "desc")
      .limit(10)
      .get();
    const scores = snapshot.docs.map((doc) => doc.data());
    res.json(scores);
  } catch (error) {
    console.error("Erro ao buscar scores:", error);
    res.status(500).json({ error: "Erro ao buscar scores" });
  }
};
