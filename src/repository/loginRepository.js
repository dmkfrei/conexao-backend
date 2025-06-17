import con from './connection.js';
import sql from 'mssql';

export async function cadastrar(login) {
    let request = await con.request();

    let codigo = Math.floor(Math.random() * 10000);
    let ativo = true;

    request.input('usuario', sql.VarChar, login.ds_usuario);
    request.input('senha', sql.VarChar, login.ds_senha);
    request.input('codigo', sql.Int, codigo);
    request.input('ativo', sql.Bit, ativo);

    const comando = `
        INSERT INTO tb_login (ds_usuario, ds_senha, nr_codigo, bt_ativo)
        VALUES (@usuario, @senha, @codigo, @ativo);

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

export async function atualizarSenha(senha, id) {
    let request = await con.request();
    
    request.input('senhaNova', sql.VarChar, senha.nova_senha);
    request.input('id', sql.Int, id);

    let comando = `
        UPDATE tb_login
           SET ds_senha = @senhaNova
         WHERE id_login = @id;
    `;

    let resp = await request.query(comando);
    return resp.rowsAffected[0];
};


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

    if(resp.recordset[0] == undefined) return null;

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