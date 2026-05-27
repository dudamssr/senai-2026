const prisma = require("../data/prisma");
const fs = require("fs");

const cadastrarimagem = async (req, res) => {

    try {

        const idEvento = parseInt(req.params.id);

        const arquivo = req.file;

        const pastafinal = `uploads/eventos/${idEvento}`;

        const caminhofinal = `${pastafinal}/${arquivo.filename}`;

        if (!fs.existsSync(pastafinal)) {

            fs.mkdirSync(pastafinal, { recursive: true });

        }

        fs.renameSync(arquivo.path, caminhofinal);

        const imagem = await prisma.imagem.create({

            data: {

                nomeoriginal: arquivo.originalname,

                nomearquivo: arquivo.filename,

                mimetype: arquivo.mimetype,

                path: caminhofinal,

                eventosId: idEvento,

            },

        });

        if (!imagem) {

            throw new Error("Erro ao salvar imagem no banco de dados");

        }

        res.status(201).json(imagem);

    } catch (error) {

        if (req.file && fs.existsSync(req.file.path)) {

            fs.unlinkSync(req.file.path);

        }

        res.status(500).json({

            error: error.message

        });

    }

};

const buscarImagem = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const imagem = await prisma.imagem.findUnique({

            where: { id },

        });

        if (!imagem) {

            return res.status(404).json({

                erro: "Imagem não encontrada"

            });

        }

        if (!fs.existsSync(imagem.path)) {

            return res.status(404).json({

                erro: "Arquivo não encontrado no servidor"

            });

        }

        res.sendFile(imagem.path, { root: "." });

    } catch (erro) {

        return res.status(500).json({

            erro: "Erro ao buscar imagem"

        });

    }

};

const cadastrar = async (req, res) => {

    try {

        const data = req.body;

        data.data_evento = new Date(data.data_evento);

        const item = await prisma.eventos.create({

            data

        });

        res.status(201).json(item);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            erro: error.message

        });

    }

};

const listar = async (req, res) => {

    try {

        const lista = await prisma.eventos.findMany({

            include: {

                imagens: true

            }

        });

        res.status(200).json(lista);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            erro: error.message

        });

    }

};

const buscar = async (req, res) => {

    try {

        const { id } = req.params;

        const item = await prisma.eventos.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                imagens: true

            }

        });

        res.status(200).json(item);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            erro: error.message

        });

    }

};

const atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const dados = req.body;

        const item = await prisma.eventos.update({

            where: {

                id: Number(id)

            },

            data: dados

        });

        res.status(200).json(item);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            erro: error.message

        });

    }

};

const excluir = async (req, res) => {

    try {

        const { id } = req.params;

        const eventoId = Number(id);

        // APAGA INSCRIÇÕES
        await prisma.inscricoes.deleteMany({

            where: {

                eventosId: eventoId

            }

        });

        // APAGA IMAGENS
        await prisma.imagem.deleteMany({

            where: {

                eventosId: eventoId

            }

        });

        // APAGA EVENTO
        const item = await prisma.eventos.delete({

            where: {

                id: eventoId

            }

        });

        res.status(200).json(item);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            erro: error.message

        });

    }

};


module.exports = {
    cadastrarimagem,
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    buscarImagem
};