const prisma = require("../data/prisma");
const listarItens = async (req, res) => {
    try {
        const [lista] = await con.query("SELECT * FROM lista");

        res.json(lista).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};

// const cadastrarItens = async (req, res) => {
//     try {
//         const { item, valor } = req.body;
//         const insert = "INSERT INTO lista VALUES (DEFAULT, ?,?)";

//         res.status(201).end();
//     } catch (err) {
//         res.json(err).status(500).end();
//     }
// };

const cadastrarItens= async(req,res)=>{

try{
    const item= req.body;
    const novoItem=await prisma.lista.create({
        data:item
    })
res.json(novoItem).status(201).end();
}catch(err){
    res.json(err).status(500).end();
}
};

const listadois = async (req, res) => {
    try {
    const lista = await prisma.lista.findMany();
        res.json(lista).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};
const atualizarItem=async(req,res)=>{
    try{
        const  {id} =req.params;
        const item = req.body;
        const update = await prisma.lista.update({
         where: {id:Number(id)},
         data: item
        });
  res.json(update).status(200).end();
    }catch(err){
        res.json(err).status(500).end();
    }
};
const apagarItens=async(req,res)=>{
    try{
        const {id} =req.params;
        const excloi = await prisma.lista.delete({
            where: {id:Number(id)}
        });
        res.json(excloi).status(200).end();

    }catch (err){
        res.json(err).status(500).end();
    }
};
module.exports = {
    listarItens,
    cadastrarItens,
    listadois,
    atualizarItem,
    apagarItens
};