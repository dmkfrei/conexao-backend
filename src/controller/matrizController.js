import { Router } from "express";
import { addFotoMatriz, alterarSituacao, cadastrarMatriz, editarMatriz, enviarAcordo } from "../repository/matrizRepository.js";
import validarMatriz from "../validation/matrizValidation.js";
import storage from "../repository/multer.js";
import multer from "multer";

const endpoints = Router();
const m = multer({ storage });

endpoints.post("/matriz", async (req, resp) => {
    try {
        validarMatriz(req);

        let dados = req.body;
        let id = await cadastrarMatriz(dados);

        resp.send({
            novoId: id
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.put("/matriz/:id", async (req, resp) => {
    try {
        validarMatriz(req);

        let dados = req.body;
        let id = req.params.id;

        let linha = await editarMatriz(dados, id);

        if (linha == 0) {
            return resp.status(404).send({ erro: 'A empresa não foi encontrada.' });
        }

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.put("/alterarSituacao/:id", async (req, resp) => {
    try {
        let id = req.params.id;
        let dados = req.body;

        let linha = await alterarSituacao(dados, id);

        if (linha == 0) {
            return resp.status(404).send({ erro: 'A empresa não foi encontrada.' });
        }

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/addFotoMatriz/:id', m.single('img'), async (req, resp) => {
    try {
        let id = req.params.id;
        let filename = req.file.filename;

        let x = await addFotoMatriz(filename, id);

        resp.send(x);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/baixarAcordo/', async (req, resp) => {
    try {
        const caminho = `public/img/acordo.png`;

        resp.download(caminho);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/enviarAcordo/:id', m.single('img'), async (req, resp) => {
    try {
        let id = req.params.id;
        let filename = req.file.filename;

        let x = await enviarAcordo(filename, id);

        resp.send(x);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;