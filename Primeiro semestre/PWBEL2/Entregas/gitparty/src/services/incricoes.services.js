const { StatusInscricao } = require("@prisma/client");
const prisma = require("../data/prisma")

const limiteparticipantes = async (usuariosId, eventosId)=>{
    const evento = await prisma.eventos.findUnique({
        where: {id: eventosId},
        include: {
            inscricoes: true
        }
    });
    const numeroparticipantes = evento.inscricoes.filter(inscricoes => inscricoes.status == "CONFIRMADA").length;
    if(numeroparticipantes ==  evento.capacidade_max){
        return "LISTA_ESPERA";
    }else{
        return "CONFIRMADA";
    }
}
const verificarduplicidade = async (usuarioId, eventoId)=>{
    const cadastro = await prisma.inscricoes.findMany({
        where: {
            eventosId: eventoId,
            usuariosId: usuarioId
        }
    })
    if(cadastro.length > 0) throw new Error("Usuário já cadastrado.");
}
const prazoCancelamento = async (evento)=>{
    const agora = new Date();
    const dataEvento = new Date(evento.data_evento);
    const diferenca = dataEvento - agora;
    const horas = diferenca / (1000 * 60 * 60)
    return horas >= 24;
}

module.exports = {
    limiteparticipantes,
    verificarduplicidade,
    prazoCancelamento
}