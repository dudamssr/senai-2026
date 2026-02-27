const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    let { nome, cpf, email, cnh } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome obrigatório" });
    }
    nome = nome.trim();

    if (nome.split(" ").length < 2) {
      return res.status(400).json({ erro: "Nome completo obrigatório" });
    }


   if (!cpf) {
    return res.status(400).json({ erro: "CPF obrigatório" });
    }

    cpf = cpf.replace(".", "").replace("-", "");

    if (cpf.length !== 11) {
    return res.status(400).json({ erro: "CPF deve conter 11 números" });
    }

    if (!email) {
      return res.status(400).json({ erro: "Email obrigatório" });
    }

    email = email.toLowerCase();

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ erro: "Email inválido" });
    }

    const emailExiste = await prisma.clientes.findUnique({
      where: { email }
    });

    if (emailExiste) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    if (!cnh) {
      return res.status(400).json({ erro: "CNH obrigatória" });
    }
    const primeiroCaractere = cnh.split("")[0];

    if (isNaN(Number(primeiroCaractere))) {
      return res.status(400).json({ erro: "CNH deve começar com número" });
    }
    const cliente = await prisma.clientes.create({
      data: {
        nome,
        cpf,
        email,
        cnh
      }
    });

    return res.status(201).json(cliente);

  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};
const listarClientes = async (req, res) => {
  const lista = await prisma.clientes.findMany();
  return res.status(200).json(lista);
};
const buscarClientes = async (req, res) => {
  const { id } = req.params;
  const cliente = await prisma.clientes.findUnique({ where: { id: Number(id) } });
  return res.status(200).json(cliente);
};
const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  const cliente = await prisma.clientes.update({
    where: { id: Number(id) },
    data: dados
  });
  return res.status(200).json(cliente);
};
const excluirCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await prisma.clientes.delete({ where: { id: Number(id) } });
  return res.status(200).json(cliente);
};


module.exports = {
  cadastrar,
  listarClientes,
  buscarClientes,
  atualizarCliente,
  excluirCliente
};
