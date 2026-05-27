const express = require("express");

const router = express.Router();
const upload = require("../middleware/uploadImage");

const {
    cadastrarimagem,
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    buscarImagem } = require("../controllers/eventos.controller");

router.post("/cadastrar/imagem/:id", upload, cadastrarimagem);
router.post("/cadastrar", cadastrar);
router.get("/listar", listar);
router.get("/buscar/:id", buscar);
router.get("/buscar/imagem/:id", buscarImagem);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;