import con from "./connection.js";
import sql from 'mssql';

export async function cadastrarResponsavel(responsavel) {
    let request = await con.request();

    request.input("id", sql.Int, responsavel.id_empresa);
    request.input("nome", sql.VarChar, responsavel.nm_nome);
    request.input("cargo", sql.VarChar, responsavel.ds_cargo);
    request.input("email", sql.VarChar, responsavel.ds_email);
    request.input("telefone", sql.VarChar, responsavel.ds_telefone);
    request.input("role", sql.VarChar, responsavel.tp_role);

    const comando = `
        insert into tb_responsavel(id_empresa, nm_nome, ds_cargo, ds_email, ds_telefone, tp_role)
        values (@id, @nome, @cargo, @email, @telefone, @role);

        SELECT SCOPE_IDENTITY() AS insertId;
    `;

    let resp = await request.query(comando);
    return resp.recordset[0].insertId;
};

export async function buscarResponsavel(id) {
    let request = await con.request();

    request.input('id', sql.Int, id);

    const comando = `
        select id_responsavel, nm_nome, ds_cargo, ds_email, ds_telefone 
        from tb_responsavel
        where id_empresa = @id;
    `;

    let resp = await request.query(comando);
    return resp.recordset;
};

export async function editarDadosResponsavel() {
    let request = await con.request();

    request.input("id_responsavel", sql.Int, responsavel.id_responsavel);
    request.input("id", sql.Int, responsavel.id_empresa);
    request.input("nome", sql.VarChar, responsavel.nm_nome);
    request.input("cargo", sql.VarChar, responsavel.ds_cargo);
    request.input("email", sql.VarChar, responsavel.ds_email);
    request.input("telefone", sql.VarChar, responsavel.ds_telefone);
    request.input("role", sql.VarChar, responsavel.tp_role);

    const comando = `
        UPDATE tb_responsavel
        SET id_reponsavel = @id_resposanvel,
        id_empresa = @id,
        nm_nome = @nome,
        ds_cargo = @cargo,
        ds_email = @email,
        ds_telefone = @telefone,
        tp_role = @role;
    `

    let resp = await request.query(comando);

    return resp.rowsAffected[0];
}

export async function DeletarResponsavel(id) {
    let request = await con.request();

    request.input('id', sql.Int, id);

    const comando = `
        delete from tb_responsavel
        where id_responsavel = @id;
    `;

    let resp = await request.query(comando);

    return resp.rowsAffected[0];
}