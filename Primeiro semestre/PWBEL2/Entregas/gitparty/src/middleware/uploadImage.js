const multer = require("multer");

const validarnomearquivo = (req, file, callback) => {
    const nomeevento = req.body.nome || "arquivo";
    const nomeformatado = nomeevento.toLowerCase().replaceAll(" ", "-");
    const nomefinal = Date.now() + "-" + nomeformatado + ".jpg";
    callback(null, nomefinal);
};

const definirdestino = (req, file, callback) => {
    callback(null, "uploads/temp");
};

const filtrarextensao = (req, file, callback) => {
    if (file.mimetype === "image.jpeg" || file.mimetype === "image/jpeg") {
        callback(null, true);
    } else {
        callback(new Error("Apenas imagens JPEG são permitidas"));
    }
};

const armazenamento = multer.diskStorage({
    destination: definirdestino,
    filename: validarnomearquivo,
});

const upload = (req, res, next) => {
    const filemulter = multer({
        storage: armazenamento,
        fileFilter: filtrarextensao,
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    });
    filemulter.single("imagem")(req, res, function (erro) {
        if (erro) {
            return res.status(400).json({ erro: erro.message });
        }
        if (!req.file) {
            return res.status(400).json({ erro: "Arquivo não enviado" });
        }
        next();
    });
};
module.exports = upload;