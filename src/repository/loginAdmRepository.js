import sql from 'mssql';
import con from './connection.js';

export async function Login (login) {
    let request = await con.request();

   request.input('usuario', sql.VarChar, login.ds_usuario);
   request.input('senha', sql.VarChar, login.ds_senha);

   const script = `
        select id_login_adm, ds_usuario, ds_senha
        from tb_login_adm
        where ds_usuario = @usuario and
        ds_senha = @senha;
   `;

   let resp = await request.query(script);
   return resp.recordset[0];
}