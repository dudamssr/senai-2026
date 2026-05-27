const prisma = require("../data/prisma");
const fs = require("fs");
const path = require("path");


const cadastrarimagem = async (req, res) => {
  try {
    const idEvento = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    const arquivo = req.file;

    const pastaFinal = path.resolve(`uploads/eventos/${idEvento}`);
    const caminhoFinal = path.join(pastaFinal, arquivo.filename);

    
    if (!fs.existsSync(pastaFinal)) {
      fs.mkdirSync(pastaFinal, { recursive: true });
    }

    fs.renameSync(arquivo.path, caminhoFinal);

    const imagem = await prisma.imagem.create({
      data: {
        nomeoriginal: arquivo.originalname,
        nomearquivo: arquivo.filename,
        mimetype: arquivo.mimetype,
        path: caminhoFinal,
        eventosId: idEvento,
      },
    });

    return res.status(201).json(imagem);

  } catch (error) {

   
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ error: error.message });
  }
};




const buscarImagem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const imagem = await prisma.imagem.findUnique({
      where: { id },
    });

    if (!imagem) {
      return res.status(404).json({ erro: "Imagem não encontrada" });
    }

  
    const caminhoAbsoluto = path.resolve(imagem.path);

    if (!fs.existsSync(caminhoAbsoluto)) {
      return res
        .status(404)
        .json({ erro: "Arquivo não encontrado no servidor" });
    }

    return res.sendFile(caminhoAbsoluto);

  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao buscar imagem" });
  }
};




const cadastrar = async (req, res) => {
  const data = req.body;
  data.data_evento = new Date(data.data_evento);

  const item = await prisma.eventos.create({ data });

  return res.status(201).json(item);
};

const listar = async (req, res) => {
  const lista = await prisma.eventos.findMany();
  return res.status(200).json(lista);
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.eventos.findUnique({
    where: { id: Number(id) },
    include: { imagens: true },
  });

  return res.status(200).json(item);
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const item = await prisma.eventos.update({
    where: { id: Number(id) },
    data: dados,
  });

  return res.status(200).json(item);
};

const excluir = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.eventos.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json(item);
};

module.exports = {
  cadastrarimagem,
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
  buscarImagem,
};