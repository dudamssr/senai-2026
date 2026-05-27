require("dotenv").config();

const listaRoutes = require("./src/routes/lista.routes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(listaRoutes);

app.get("/", (req, res) => {
    res.send("App Online");
});

app.listen(process.env.PORT_APP, ()=> {
    console.log("Online na Porta 3000");
});