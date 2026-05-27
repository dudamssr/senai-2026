const express = require("express");

const router = express.Router();

const {
   cadastrar,
  listarClientes,
  buscarClientes,
  atualizarCliente,
  excluirCliente
     } = require("../controllers/clientes.controller");

router.post("/cadastrar", cadastrar);
router.get("/listar", listarClientes);
router.get("/buscar/:id", buscarClientes);
router.put("/atualizar/:id", atualizarCliente);
router.delete("/excluir/:id", excluirCliente);

module.exports = router;