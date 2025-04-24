import sql from 'mssql';

const con = await sql.connect({
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PWD,
  server: process.env.SQLSERVER_SERVER,
  database: process.env.SQLSERVER_DB,
  port: 1433,

  options: {
    encrypt: true,
    trustServerCertificate: true
  }
});

console.log('BD!');
export default con;
