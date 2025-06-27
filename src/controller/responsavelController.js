import { Router } from "express";
import { buscarResponsavel, buscarResponsavelPorId, cadastrarResponsavel, DeletarResponsavel, editarDadosResponsavel } from "../repository/responsavelRepository.js";
import ValidarResponsavel from "../validation/responsavelValidation.js";
import { autenticar } from "../utils/jwt.js";
import { BuscarEmpresaPeloLogin } from "../repository/matrizRepository.js";

const endpoints = Router();

endpoints.post("/resp", autenticar, async (req, resp) => {
    try {
        ValidarResponsavel(req);
        const tipo = req.user.tipo;

        let dados = req.body;

        const id_login = req.user.id;
        dados.id_empresa = await BuscarEmpresaPeloLogin(id_login);

        let id = await cadastrarResponsavel(dados);

        resp.send({
            novoId: id
        })

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/resp/:id', autenticar, async (req, resp) => {
    try {
        ValidarResponsavel(req);

        let id = req.params.id;
        let dados = req.body;
        let editar = await editarDadosResponsavel(dados, id);

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarResp', autenticar, async (req, resp) => {
    try {
        const tipo = req.user.tipo;
        let id_empresa;

        if (tipo == 'adm') {
            id_empresa = req.query.id_empresa;
        } else {
            const id_login = req.user.id;
            id_empresa = await BuscarEmpresaPeloLogin(id_login);
        }

        const infos = await buscarResponsavel(id_empresa);
        resp.send({ infos });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.get('/resp/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        const infos = await buscarResponsavelPorId(id);

        resp.send({ infos: infos });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.delete('/resp/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let deletar = await DeletarResponsavel(id);

        if (deletar == 0) {
            return resp.status(400).send({
                erro: 'Nenhum funcionário foi encontrado.'
            })
        }

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;