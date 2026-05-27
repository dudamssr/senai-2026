const prisma = require("../data/prisma");
const { limiteparticipantes, verificarduplicidade, prazoCancelamento } = require("../services/incricoes.services");

const cadastrar = async (req, res) => {
    try{
    const data = req.body;
    await verificarduplicidade(data.usuariosId, data.eventosId);
    let status = await limiteparticipantes (data.usuariosId, data.eventosId)
   
    data.status = status;

    const inscricao = await prisma.inscricoes.create({
        data
    });

    res.json(inscricao).status(201).end();
    }catch(error){
        res.status(500).json(error.toString()).end();
    }
};

const listar = async (req, res) => {
    const lista = await prisma.inscricoes.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
   
    const busca = await prisma.inscricoes.findUnique({
        where: { id : Number(id) }
    });

    res.json(busca).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
   
    if(!prazoCancelamento(eventos)) throw new Error("Não foi possível cancelar o evento. Prazo de 24hrs expirado")
   
    const atualizacao = await prisma.inscricoes.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(atualizacao).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
   
    const exclusao = await prisma.inscricoes.delete({
        where: { id : Number(id) }
    });

    res.json(exclusao).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}