import con from "./connection.js";
import sql from "mssql";

export async function cadastrarMatriz(matriz) {
    let request = await con.request();

    let ativo = true;
    let situacao = 'Falta assinar';

    request.input('id', sql.Int, matriz.id_login);
    request.input('nome', sql.VarChar, matriz.ds_razao_social);
    request.input('cnpj', sql.VarChar, matriz.ds_cnpj);
    request.input('inscricao', sql.VarChar, matriz.ds_inscricao);
    request.input('endereco', sql.VarChar, matriz.ds_endereco);
    request.input('numero', sql.VarChar, matriz.ds_numero);
    request.input('bairro', sql.VarChar, matriz.ds_bairro);
    request.input('cep', sql.VarChar, matriz.ds_cep);
    request.input('cidade', sql.VarChar, matriz.ds_cidade);
    request.input('estado', sql.VarChar, matriz.ds_estado);
    request.input('telefone', sql.VarChar, matriz.ds_telefone);
    request.input('celular', sql.VarChar, matriz.ds_celular);
    request.input('ativo', sql.Bit, ativo);
    request.input('situacao', sql.VarChar, situacao);

    const comando =
        `insert into tb_empresa (id_login, ds_razao_social, ds_cnpj, ds_inscricao, ds_endereco, ds_numero, ds_bairro, ds_cep, ds_cidade, ds_estado, ds_telefone, ds_celular, bt_ativo, ds_situacao)
        values (@id, @nome, @cnpj, @inscricao, @endereco, @numero, @bairro, @cep, @cidade, @estado, @telefone, @celular, @ativo, @situacao);
        
        SELECT SCOPE_IDENTITY() AS insertId;
    `;

    let resp = await request.query(comando);
    return resp.recordset[0].insertId;
};

export async function editarMatriz(matriz, id) {
    let request = await con.request();

    request.input('id', sql.Int, id);
    request.input('nome', sql.VarChar, matriz.ds_razao_social);
    request.input('cnpj', sql.VarChar, matriz.ds_cnpj);
    request.input('inscricao', sql.VarChar, matriz.ds_inscricao);
    request.input('endereco', sql.VarChar, matriz.ds_endereco);
    request.input('numero', sql.VarChar, matriz.ds_numero);
    request.input('bairro', sql.VarChar, matriz.ds_bairro);
    request.input('cep', sql.VarChar, matriz.ds_cep);
    request.input('cidade', sql.VarChar, matriz.ds_cidade);
    request.input('estado', sql.VarChar, matriz.ds_estado);
    request.input('telefone', sql.VarChar, matriz.ds_telefone);
    request.input('celular', sql.VarChar, matriz.ds_celular);

    const comando = `
        UPDATE tb_empresa
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
        WHERE id_empresa = @id;
    `;

    let resp = await request.query(comando);
    return resp.rowsAffected[0];
};

export async function alterarSituacao(matriz, id) {
    let request = await con.request();

    request.input('situacao', sql.VarChar, matriz.ds_situacao);
    request.input('id', sql.Int, id);

    const comando = `
       update tb_empresa
       set ds_situacao = @situacao
       where id_empresa = @id; 
    `;

    let resp = await request.query(comando);
    return resp.rowsAffected[0];
};

export async function addFotoMatriz(foto, id) {
    let request = await con.request();

    request.input('foto', sql.VarChar, foto);
    request.input('id', sql.Int, id);

    const comando = `
        update tb_empresa
        set ds_foto = @foto
        where id_empresa = @id;
    `;

    let resp = await request.query(comando);

    return resp[0];
};

export async function enviarAcordo(acordo, id) {
    let request = await con.request();

    let situacao = 'Assinado';

    request.input('id', sql.Int, id);
    request.input('acordo', sql.VarChar, acordo); +
        request.input('situacao', sql.VarChar, situacao);

    const comando = `
        update tb_empresa
        set ds_acordo = @acordo,
        ds_situacao = @situacao
        where id_empresa = @id;
    `;

    let resp = await request.query(comando);

    return resp[0];
};

export async function BuscarEmpresaPeloLogin(id_login) {
    let request = await con.request();
    request.input('id_login', sql.Int, id_login);

    const comando = `
        SELECT id_empresa 
        FROM tb_empresa
        WHERE id_login = @id_login;
    `;

    let resp = await request.query(comando);
    return resp.recordset[0];
};