import { Router } from "express";
import { cadastrar, atualizarSenha, login, buscarSenhaAntiga } from "../repository/loginRepository.js";
import ValidarLogin from "../validation/loginValidation.js";
import { gerarToken } from "../utils/jwt.js";
import storage from "../repository/multer.js";
import multer from "multer";

const endpoints = Router();
const m = multer({ storage });

endpoints.post("/login", async (req, resp) => {
    try {

        ValidarLogin(req);

        let dados = req.body;
        let id = await cadastrar(dados);

        resp.send({
            novoId: id
        })

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put("/login/senha/:id", async (req, resp) => {
    try {
        let id = req.params.id;
        let dados = req.body;

        let senhaAntiga = await buscarSenhaAntiga(id);

        if (senhaAntiga != dados.ds_senha) {
            return resp.status(404).send({ erro: 'A senha antiga está incorreta.' })
        }
        
        let linha = await atualizarSenha(dados, id);

        if (linha > 0) {
            resp.send()
        }

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post("/logar", async (req, resp) => {
    try {
        ValidarLogin(req);

        let dados = req.body;
        let logar = await login(dados);

        if (logar == null) {
            return resp.status(404).send({
                erro: 'Usuário ou senha incorretos.'
            });
        }

        resp.send({
            usuário: logar.ds_usuario,
            senha: logar.ds_senha
        })


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;