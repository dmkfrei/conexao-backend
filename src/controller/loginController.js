import { Router } from "express";
import { cadastrar, atualizarLogin, login, buscarSenhaAntiga, buscarInfosLogin, buscarLoginPorEmailResponsavel, gerarCodigo, verificarCodigo, atualizarSenha, verificarCadastroEmpresa } from "../repository/loginRepository.js";
import ValidarLogin from "../validation/loginValidation.js";
import { autenticar, gerarToken } from "../utils/jwt.js";
import storage from "../repository/multer.js";
import multer from "multer";
import axios from 'axios';

const endpoints = Router();
const m = multer({ storage });

endpoints.post("/login", autenticar, async (req, resp) => {
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

endpoints.put("/login/senha", autenticar, async (req, resp) => {
    try {
        let id = req.user.id;
        let dados = req.body;

        if (dados.ds_senha && dados.nova_senha) {
            let senhaAntiga = await buscarSenhaAntiga(id);

            if (senhaAntiga != dados.ds_senha) {
                return resp.status(400).send({ erro: 'A senha antiga está incorreta.' });
            }
        }

        let linhasAfetadas = await atualizarLogin(dados, id);

        if (linhasAfetadas == 0) {
            resp.status(400).send({ erro: 'Nenhuma alteração realizada.' });
        }

        resp.send();
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post("/logar", async (req, resp) => {
    try {
        ValidarLogin(req);

        let dados = req.body;
        let logar = await login(dados);

        if (logar == null || logar == undefined) {
            return resp.status(404).send({
                erro: 'Usuário ou senha incorretos.'
            });
        }

        resp.send({
            token: gerarToken({
                id: logar.id_login,
                usuario: logar.ds_usuario,
                tipo: 'cliente'
            })
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/buscarLoginPorId', autenticar, async (req, resp) => {
    try {
        let id = req.user.id;
        let infos = await buscarInfosLogin(id);

        resp.send(infos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/login', autenticar, async (req, resp) => {
    try {
        let id = req.user.id;
        let infos = await buscarInfosLogin(id);

        resp.send(infos);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
});

endpoints.get('/usuario/tipo', autenticar, async (req, resp) => {
    try {
        const tipo = req.user.tipo;

        resp.send({ tipo });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post('/enviarCodigo', async (req, resp) => {
    try {
        let dados = req.body;
        let codigo = await gerarCodigo(dados.ds_email);

        resp.send({ codigo })

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post('/verificarCodigo', async (req, resp) => {
    try {
        const { codigo } = req.body;

        const id_login = await verificarCodigo(codigo);

        resp.send({ sucesso: true, id_login });

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.put('/changePassword/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let { nova_senha } = req.body;

        let linhasAfetadas = await atualizarSenha(nova_senha, id);

        if (linhasAfetadas == 0) {
            return resp.status(400).send({ erro: 'Senha não foi alterada.' });
        }

        resp.send({ mensagem: 'Senha atualizada com sucesso.' });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

endpoints.get('/verificarCadastro', autenticar, async (req, resp) => {
    try {
        let id = req.user.id;
        let empresa = await verificarCadastroEmpresa(id);
        
        if (empresa > 0) {
            resp.send({ cadastrada: true });
        } else {
            resp.send({ cadastrada: false });
        }

    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

export default endpoints;