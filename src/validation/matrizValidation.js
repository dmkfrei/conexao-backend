export default function validarMatriz(req) {
    if (!req.body.ds_razao_social) throw new Error("A razão social é obrigatória.");
    if (!req.body.ds_cnpj) throw new Error("O CNPJ é obrigatório.");
    if (!req.body.ds_inscricao) throw new Error("A inscrição é obrigatória.");
    if (!req.body.ds_endereco) throw new Error("O endereço é obrigatório.");
    if (!req.body.ds_numero) throw new Error("O número é obrigatório.");
    if (!req.body.ds_bairro) throw new Error("O bairro é obrigatório.");
    if (!req.body.ds_cep) throw new Error("O CEP é obrigatório.");
    if (!req.body.ds_cidade) throw new Error("A cidade é obrigatória.");
    if (!req.body.ds_estado) throw new Error("O estado é obrigatório.");
    if (!req.body.ds_telefone) throw new Error("O telefone é obrigatório.");
    if (!req.body.ds_celular) throw new Error("O celular é obrigatório.");
    if (!req.body.ds_acordo) throw new Error("O acordo é obrigatório.");
    if (!req.body.ds_situacao) throw new Error("A situação é obrigatória.");
}