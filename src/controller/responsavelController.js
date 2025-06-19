import { Router } from "express";
import { buscarResponsavel, cadastrarResponsavel, DeletarResponsavel, editarDadosResponsavel } from "../repository/responsavelRepository.js";
import ValidarResponsavel from "../validation/responsavelValidation.js";
import { autenticar } from "../utils/jwt.js";

const endpoints = Router();

endpoints.post("/resp", autenticar, async (req, resp) => {
    try {
        ValidarResponsavel(req);

        let dados = req.body;
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
        let editar = editarDadosResponsavel(dados, id);

        if (editar == 0) {
            return resp.status(400).send({
                erro: 'Os dados do responsável não foram afetados.'
            })
        }

        resp.send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarResp/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let infos = await buscarResponsavel(id);
        
        resp.send({
            infos: infos
        })

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
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