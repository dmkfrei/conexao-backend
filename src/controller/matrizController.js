import { Router } from "express";
import { alterarSituacao, cadastrarMatriz, editarMatriz } from "../repository/matrizRepository.js";
import validarMatriz from "../validation/matrizValidation.js";

const endpoints = Router();

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
})

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
})

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
        })
    }
})

export default endpoints;