export default function validarMatriz(req) {
    if (!req.body.ds_razao_social) throw new Error("A razão social é obrigatória.");
    if (!req.body.ds_cnpj) throw new Error("O CNPJ é obrigatório.");
    const cnpjNumeros = req.body.ds_cnpj.replace(/\D/g, '');
    if (cnpjNumeros.length < 14) throw new Error("O CNPJ deve ter 14 números.");

    if (!req.body.ds_inscricao) throw new Error("A inscrição é obrigatória.");
    if (!req.body.ds_endereco) throw new Error("O endereço é obrigatório.");
    if (!req.body.ds_numero) throw new Error("O número é obrigatório.");
    if (!req.body.ds_bairro) throw new Error("O bairro é obrigatório.");

    if (!req.body.ds_cep) throw new Error("O CEP é obrigatório.");
    const cepNumeros = req.body.ds_cep.replace(/\D/g, '');
    if (cepNumeros.length < 8) throw new Error("O CEP deve ter 8 números.");

    if (!req.body.ds_cidade) throw new Error("A cidade é obrigatória.");
    if (!req.body.ds_estado) throw new Error("O estado é obrigatório.");

    if (!req.body.ds_telefone) throw new Error("O telefone é obrigatório.");
    const telefoneNumeros = req.body.ds_telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10) throw new Error("O telefone deve ter pelo menos 10 números.");

    if (!req.body.ds_celular) throw new Error("O celular é obrigatório.");
    const celularNumeros = req.body.ds_celular.replace(/\D/g, '');
    if (celularNumeros.length < 11) throw new Error("O celular deve ter pelo menos 11 números.");
}
