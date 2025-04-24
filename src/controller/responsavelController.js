import { Router } from "express";
import { cadastrarResponsavel } from "../repository/responsavelRepository.js";
import ValidarResponsavel from "../validation/responsavelValidation.js";

const endpoints = Router();

endpoints.post("/resp", async (req, resp) => {
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
})

export default endpoints;