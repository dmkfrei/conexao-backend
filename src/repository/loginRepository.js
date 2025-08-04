import con from './connection.js';
import sql from 'mssql';
import axios from 'axios';

export async function cadastrar(login) {
    let request = await con.request();

    request.input('usuario', sql.VarChar, login.ds_usuario);
    let verificarUsuario = await request.query(`
        SELECT COUNT(*) AS total FROM tb_login WHERE ds_usuario = @usuario
    `);

    if (verificarUsuario.recordset[0].total > 0) {
        throw new Error('Este usuário já está cadastrado.');
    }

    let ativo = true;

    request.input('senha', sql.VarChar, login.ds_senha);
    request.input('ativo', sql.Bit, ativo);

    const comando = `
        INSERT INTO tb_login (ds_usuario, ds_senha, bt_ativo)
        VALUES (@usuario, @senha, @ativo);

        SELECT SCOPE_IDENTITY() AS insertId;
    `;

    let resp = await request.query(comando);
    return resp.recordset[0].insertId;
};


export async function buscarSenhaAntiga(id) {
    let request = await con.request();

    request.input('id', sql.Int, id);
    const comando = `
        SELECT ds_senha FROM tb_login WHERE id_login = @id;
    `;

    let resp = await request.query(comando);

    return resp.recordset[0]?.ds_senha;
};

export async function atualizarLogin(dados, id) {
    let request = await con.request();

    request.input('senhaNova', sql.VarChar, dados.nova_senha);
    request.input('usuario', sql.VarChar, dados.ds_usuario);
    request.input('id', sql.Int, id);

    const comando = `
        UPDATE tb_login
           SET ds_usuario = @usuario,
           ds_senha = @senhaNova
        WHERE id_login = @id;
    `;

    let resp = await request.query(comando);
    return resp.rowsAffected[0];
}

export async function login(login) {
    let request = await con.request();

    request.input('usuario', sql.VarChar, login.ds_usuario);
    request.input('senha', sql.VarChar, login.ds_senha);

    const comando = `
    select id_login, ds_usuario, ds_senha
    from tb_login
    where ds_usuario = @usuario and
    ds_senha = @senha;
    `;

    let resp = await request.query(comando);

    if (resp.recordset[0] == undefined) return null;

    let data = new Date(Date.now());

    request.input('data', sql.DateTime, data);
    request.input('id', sql.Int, resp.recordset[0].id_login);

    const script = `
    update tb_login
    set dt_ultimo_login = @data
    where id_login = @id;
    `;

    let atualizarLogin = await request.query(script);
    return resp.recordset[0];
};

export async function buscarInfosLogin(id) {
    let request = await con.request();

    request.input('id', sql.Int, id);

    const comando = `
        select ds_usuario, ds_senha from tb_login
        where id_login = @id;
    `;

    let resp = await request.query(comando);

    return resp.recordset;
};

export async function buscarLoginPorEmailResponsavel(email) {
    let request = await con.request();
    request.input('email', sql.VarChar, email.ds_email);

    const comando = `
        SELECT l.id_login, r.id_responsavel
        FROM tb_responsavel r
        JOIN tb_empresa e ON r.id_empresa = e.id_empresa
        JOIN tb_login l ON e.id_login = l.id_login
        WHERE r.ds_email = @email;
    `;

    const resp = await request.query(comando);
    return resp.recordset[0];
}

export async function gerarCodigo(email) {
    const codigo = Math.floor(100000 + Math.random() * 900000);
    const expiracao = new Date(Date.now() + 15 * 60 * 1000);

    let request = await con.request();
    request.input('email', sql.VarChar, email);
    request.input('codigo', sql.Int, codigo);
    request.input('expiracao', sql.DateTime, expiracao);

    const comando = `
        UPDATE l
        SET l.nr_codigo = @codigo,
            l.dt_codigo = @expiracao
        FROM tb_login l
        JOIN tb_empresa e ON l.id_login = e.id_login
        JOIN tb_responsavel r ON r.id_empresa = e.id_empresa
        WHERE r.ds_email = @email;
    `;

    await request.query(comando);

    return codigo;
}

export async function verificarCodigo(codigoDigitado) {
    let request = await con.request();

    request.input('codigo', sql.Int, codigoDigitado);

    const comando = `
        SELECT l.id_login, l.dt_codigo
        FROM tb_login l
        JOIN tb_empresa e ON l.id_login = e.id_login
        JOIN tb_responsavel r ON r.id_empresa = e.id_empresa
        WHERE l.nr_codigo = @codigo;
    `;

    const resultado = await request.query(comando);
    const linha = resultado.recordset[0];

    if (!linha) throw new Error('Código inválido.');

    const agora = new Date();
    if (agora > linha.dt_codigo)
        throw new Error('Código expirado.');

    return linha.id_login;
}

export async function atualizarSenha(novaSenha, id) {
    let request = await con.request();

    request.input('senhaNova', sql.VarChar, novaSenha);
    request.input('id', sql.Int, id);

    const comando = `
        UPDATE tb_login
           SET ds_senha = @senhaNova
         WHERE id_login = @id;
    `;

    let resp = await request.query(comando);
    return resp.rowsAffected[0];
}
