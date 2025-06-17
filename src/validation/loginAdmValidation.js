export default function ValidarLoginAdm(req) {
    if(!req.body.ds_usuario) throw new Error("O usuário que você inseriu está inválido.");
    if(!req.body.ds_senha) throw new Error("A senha que você inseriu está inválida.");
}
