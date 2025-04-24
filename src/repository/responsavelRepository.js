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