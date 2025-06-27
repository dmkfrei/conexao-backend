import { Router } from "express";
import { addFotofilial, cadastrarFilial, deletarFilial, editarFilial, listarFilial, buscarFilialPorId } from "../repository/filialRepository.js";
import { BuscarEmpresaPeloLogin } from '../repository/matrizRepository.js';
import validarFilial from "../validation/filialValidation.js";
import { autenticar } from "../utils/jwt.js";
import storage from "../repository/multer.js";
import multer from "multer";

const endpoints = Router();
const m = multer({ storage });

endpoints.post("/filial", autenticar, async (req, resp) => {
    try {
        validarFilial(req); 

        const id_login = req.user.id;

        let dados = req.body;
        dados.id_empresa = await BuscarEmpresaPeloLogin(id_login);
        let id = await cadastrarFilial(dados);

        resp.send({
            novoId: id
        })

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete("/filial/:id", autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await deletarFilial(id);

        if (linha == 0) {
            return resp.status(400).send({ erro: "Nenhuma filial foi encontrada." });
        }

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put("/filial/:id", autenticar, async (req, resp) => {
    try {
        validarFilial(req);

        let id = req.params.id;
        let dados = req.body;
        let linha = await editarFilial(dados, id);

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get("/filial", autenticar, async (req, resp) => {
    try {
        const tipo = req.user.tipo;

        if (tipo == 'cliente') {
            const id_login = req.user.id;
            const id_empresa = await BuscarEmpresaPeloLogin(id_login);

            const infos = await listarFilial(id_empresa);
            resp.send({ tipo, dados: infos });

        } else {
            const id_empresa = req.query.id_empresa;
            const infos = await listarFilial(id_empresa);
            resp.send({ tipo, dados: infos });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.put('/addFotoFilial/:id', autenticar, m.single('img'), async (req, resp) => {
    try {
        let id = req.params.id;
        let filename = req.file.filename;

        let x = await addFotofilial(filename, id);

        resp.send(x);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarFilialPorId/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let resultado = await buscarFilialPorId(id);

        resp.send(resultado);
    } catch (err) {
        resp.status(400).send({ erro: 'Erro ao buscar filial.' });
    }
});


export default endpoints;