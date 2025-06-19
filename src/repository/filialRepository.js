import con from "./connection.js";
import sql from 'mssql';

export async function cadastrarFilial(filial) {
    let request = await con.request();

    let ativo = true;
    let situacao = 'Falta assinar';

    request.input('id', sql.Int, filial.id_empresa);
    request.input('nome', sql.VarChar, filial.ds_razao_social);
    request.input('cnpj', sql.VarChar, filial.ds_cnpj);
    request.input('inscricao', sql.VarChar, filial.ds_inscricao);
    request.input('endereco', sql.VarChar, filial.ds_endereco);
    request.input('numero', sql.VarChar, filial.ds_numero);
    request.input('bairro', sql.VarChar, filial.ds_bairro);
    request.input('cep', sql.VarChar, filial.ds_cep);
    request.input('cidade', sql.VarChar, filial.ds_cidade);
    request.input('estado', sql.VarChar, filial.ds_estado);
    request.input('telefone', sql.VarChar, filial.ds_telefone);
    request.input('celular', sql.VarChar, filial.ds_celular);
    request.input('ativo', sql.Bit, ativo);
    request.input('situacao', sql.VarChar, situacao);

    const comando = `
        insert into tb_filial (id_empresa, ds_razao_social, ds_cnpj, ds_inscricao, ds_endereco, ds_numero, ds_bairro, ds_cep, ds_cidade, ds_estado, ds_telefone, ds_celular, bt_ativo, ds_situacao)
        values (@id, @nome, @cnpj, @inscricao, @endereco, @numero, @bairro, @cep, @cidade, @estado, @telefone, @celular, @ativo, @situacao);
        
        SELECT SCOPE_IDENTITY() AS insertId;
    `;

    let resp = await request.query(comando);

    return resp.recordset[0].insertId;
};

export async function deletarFilial(id) {
    let request = await con.request();

    request.input("id", sql.Int, id);

    const comando = `
        delete from tb_filial
        where id_filial = @id;
    `;

    let resp = await request.query(comando);

    return resp.rowsAffected[0];
};

export async function editarFilial(filial, id) {
    let request = await con.request();

    request.input('id', sql.Int, id);
    request.input('nome', sql.VarChar, filial.ds_razao_social);
    request.input('cnpj', sql.VarChar, filial.ds_cnpj);
    request.input('inscricao', sql.VarChar, filial.ds_inscricao);
    request.input('endereco', sql.VarChar, filial.ds_endereco);
    request.input('numero', sql.VarChar, filial.ds_numero);
    request.input('bairro', sql.VarChar, filial.ds_bairro);
    request.input('cep', sql.VarChar, filial.ds_cep);
    request.input('cidade', sql.VarChar, filial.ds_cidade);
    request.input('estado', sql.VarChar, filial.ds_estado);
    request.input('telefone', sql.VarChar, filial.ds_telefone);
    request.input('celular', sql.VarChar, filial.ds_celular);

    const comando = `
        UPDATE tb_filial
        SET
            ds_razao_social = @nome,
            ds_cnpj = @cnpj,
            ds_inscricao = @inscricao,
            ds_endereco = @endereco,
            ds_numero = @numero,
            ds_bairro = @bairro,
            ds_cep = @cep,
            ds_cidade = @cidade,
            ds_estado = @estado,
            ds_telefone = @telefone,
            ds_celular = @celular
        WHERE id_filial = @id;
    `;    

    let resp = await request.query(comando);
    return resp.rowsAffected[0];
};

export async function listarFilial(id) {
    let request = await con.request();

    request.input('id', sql.Int, id);

    const comando = `
        select id_filial, ds_razao_social, ds_cnpj, ds_endereco, ds_numero, ds_bairro, ds_cep, ds_cidade, ds_estado, ds_telefone, ds_celular from tb_filial
        where id_empresa = @id;
    `;

    let resp = await request.query(comando);

    return resp.recordset;
};

export async function addFotofilial(foto, id) {
    let request = await con.request();

    request.input('foto', sql.VarChar, foto);
    request.input('id', sql.Int, id);

    const comando = `
        update tb_filial
        set ds_foto = @foto
        where id_filial = @id;
    `;

    let resp = await request.query(comando);

    return resp[0];
};