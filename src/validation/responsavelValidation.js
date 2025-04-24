export default function ValidarResponsavel(req) {
    if(!req.body.nm_nome) throw new Error("O nome é obrigatório.");
    if(!req.body.ds_cargo) throw new Error("O cargo é obrigatório.");
    if(!req.body.ds_email) throw new Error("O email é obrigatório.");
    if(!req.body.ds_telefone) throw new Error("O telefone é obrigatório.");
    if(!req.body.tp_role) throw new Error("O role é obrigatório.");
}