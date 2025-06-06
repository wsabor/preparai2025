const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoresController");

// POST /api/scores
router.post("/", scoresController.create);
// GET  /api/scores
router.get("/", scoresController.listTop);

module.exports = router;
