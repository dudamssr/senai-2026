const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    let { placa, marca, modelo, ano } = req.body;

    if (!placa) {
      return res.status(400).json({ erro: "Placa obrigatória" });
    }

    placa = placa.trim().replace("-", "").toUpperCase();

    if (placa.includes(" ") || placa.length !== 7) {
      return res.status(400).json({ erro: "Placa inválida" });
    }

    if (!marca || !modelo) {
      return res.status(400).json({ erro: "Marca e modelo obrigatórios" });
    }

    marca = marca.trim();
    modelo = modelo.trim();

    if (marca.split(" ").length > 1 || modelo.split(" ").length > 1) {
      return res.status(400).json({ erro: "Marca e modelo não podem conter espaços" });
    }

    marca = marca.toLowerCase();
    modelo = modelo.toLowerCase();

    if (!ano) {
      return res.status(400).json({ erro: "Ano obrigatório" });
    }

    // 🔥 corrigido: ano deve ser número
    ano = Number(ano);

    if (isNaN(ano) || ano.toString().length !== 4) {
      return res.status(400).json({ erro: "Ano inválido" });
    }

    const existe = await prisma.carros.findUnique({
      where: { placa }
    });

    if (existe) {
      return res.status(400).json({ erro: "Placa já cadastrada" });
    }

    const item = await prisma.carros.create({
      data: {
        placa,
        marca,
        modelo,
        ano
      }
    });

    res.status(201).json(item);

  } catch (erro) {
    console.log(erro); // ajuda a ver o erro real
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
};

const listar = async (req, res) => {
  const lista = await prisma.carros.findMany();
  return res.status(200).json(lista);
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.carros.findUnique({
    where: { id: Number(id) }
  });

  return res.status(200).json(item);
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const item = await prisma.carros.update({
    where: { id: Number(id) },
    data: dados
  });

  return res.status(200).json(item);
};

const excluir = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.carros.delete({
    where: { id: Number(id) }
  });

  return res.status(200).json(item);
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir
};