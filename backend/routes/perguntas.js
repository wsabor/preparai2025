const express = require("express");
const router = express.Router();
const perguntasController = require("../controllers/perguntasController");

// GET /api/perguntas
router.get("/", perguntasController.getAll);

module.exports = router;
