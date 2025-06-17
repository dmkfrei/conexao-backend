import { Login } from "../repository/loginAdmRepository.js";
import { Router } from 'express';
import { gerarToken } from "../utils/jwt.js";
import ValidarLoginAdm from "../validation/loginAdmValidation.js";

const endpoints = Router();

endpoints.post('/loginAdm', async (req, resp) => {
    try {
        ValidarLoginAdm(req);

        let dados = req.body;
        let login = await Login(dados);

        if (login == null || login == undefined) {
            return resp.status(400).send({
                erro: 'Usuário ou senha incorretos.'
            })
        }

        resp.send({
            token: gerarToken({
                id: login.id_login,
                usuario: login.ds_usuario,
                senha: login.ds_senha
            })
        })
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default endpoints;