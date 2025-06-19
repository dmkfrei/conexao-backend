import { Router } from "express";
import { addFotofilial, cadastrarFilial, deletarFilial, editarFilial, listarFilial } from "../repository/filialRepository.js";
import validarFilial from "../validation/filialValidation.js";
import { autenticar } from "../utils/jwt.js";
import storage from "../repository/multer.js";
import multer from "multer";

const endpoints = Router();
const m = multer({ storage });

endpoints.post("/filial", autenticar, async (req, resp) => {
    try {
        validarFilial(req);

        let dados = req.body;
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

        if (linha == 0) {
            return resp.status(400).send({ erro: "Nenhuma linha foi encontrada." });
        }

        resp.send();
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get("/filial/:id", autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let infos = await listarFilial(id);

        resp.send({ infos: infos });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
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

export default endpoints;