import { Router } from "express";
import { addFotoMatriz, alterarSituacao, buscarEmpresaPorId, buscarEmpresa, BuscarEmpresaPeloLogin, cadastrarMatriz, editarMatriz, enviarAcordo, BuscarSituacaoEmpresa, buscarAcordoEmpresa, buscarFotoMatriz } from "../repository/matrizRepository.js";
import validarMatriz from "../validation/matrizValidation.js";
import storage from "../repository/multer.js";
import multer from "multer";
import { autenticar } from "../utils/jwt.js";

const endpoints = Router();
const m = multer({ storage });

endpoints.post("/matriz", autenticar, async (req, resp) => {
    try {
        validarMatriz(req);

        let dados = req.body;
        dados.id_login = req.user.id;
        let id = await cadastrarMatriz(dados);

        resp.send({
            novoId: id
        });

    } catch (err) {
        if (err.message.includes('UQ__tb_empre__174390E86DE8873B')) {
            return resp.status(400).send({ erro: 'Este CNPJ já está cadastrado.' });
        }

        return resp.status(400).send({ erro: err.message });
    }
});

endpoints.put("/matriz/:id", autenticar, async (req, resp) => {
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

endpoints.put("/alterarSituacao/:id", autenticar, async (req, resp) => {
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

endpoints.get('/buscarSituacao', autenticar, async (req, resp) => {
    try {
        const tipo = req.user.tipo;

        if (tipo != 'cliente') {
            return resp.send({ situacao: null });
        }

        const id_login = req.user.id;
        const id_empresa = await BuscarEmpresaPeloLogin(id_login);

        const resultado = await BuscarSituacaoEmpresa(id_empresa);

        const situacao = (resultado.length > 0) ? resultado[0].ds_situacao : null;

        return resp.send({ situacao });

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.put('/addFotoMatriz', autenticar, m.single('img'), async (req, resp) => {
    try {
        let id = req.user.id;

        let id_empresa = await BuscarEmpresaPeloLogin(id);
        let filename = req.file.filename;

        let x = await addFotoMatriz(filename, id_empresa);

        resp.send(x);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/baixarAcordo/', autenticar, async (req, resp) => {
    try {
        const caminho = `public/img/acordo.png`;

        resp.download(caminho);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/enviarAcordo', autenticar, m.single('img'), async (req, resp) => {
    try {
        const id_login = req.user.id;
        const id_empresa = await BuscarEmpresaPeloLogin(id_login);

        const filename = req.file.filename;

        const resultado = await enviarAcordo(filename, id_empresa);

        resp.send(resultado);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarEmpresaPeloLogin', autenticar, async (req, resp) => {
    try {
        let id_login = req.user.id;
        let id_empresa = await BuscarEmpresaPeloLogin(id_login);

        resp.send({ id_empresa });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarEmpresa', autenticar, async (req, resp) => {
    try {
        let infos = await buscarEmpresa();

        resp.send(infos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarEmpresaPorId/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let infos = await buscarEmpresaPorId(id);

        resp.send(infos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarAcordo/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const file = await buscarAcordoEmpresa(id);

        const img = file.ds_acordo;

        resp.send({ img: img });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarFotoMatriz', autenticar, async (req, resp) => {
    try {
        const id_login = req.user.id;

        const id_empresa = await BuscarEmpresaPeloLogin(id_login);
        const resultado = await buscarFotoMatriz(id_empresa);

        const foto = resultado?.ds_foto;

        resp.send({ foto });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});
export default endpoints;