require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* Importar e Implementar Rotas */
// const modelRotas = require("./src/model.routes");
// app.use(modelRotas);
/* Fim */

const turmasRoutes = require("./src/routes/turmas.routes");
const alunosRoutes = require("./src/routes/alunos.routes");

app.use("/turmas", turmasRoutes);
app.use("/alunos", alunosRoutes);

const porta = process.env.PORT_APP || 3000;

app.listen(porta, () => {
    console.log(`Online na porta ${porta}`);
});