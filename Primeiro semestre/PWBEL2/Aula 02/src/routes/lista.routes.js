const express = require("express");

const router = express.Router();

const listarController = require("../controllers/lista.controller");

router.get("/lista", listarController.listadois);
router.post("/lista", listarController.cadastrarItens);
router.put("/lista/:id", listarController.atualizarItem);
router.delete("/lista/:id", listarController.apagarItens);

module.exports = router;