CREATE DATABASE db_conexao;

USE db_conexao;

CREATE TABLE tb_login (
    id_login INT IDENTITY(1,1) PRIMARY KEY,
    ds_usuario VARCHAR(255) NOT NULL,
    ds_senha VARCHAR(255) NOT NULL,
    dt_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
    dt_ultimo_login DATETIME NOT NULL DEFAULT GETDATE(),
    nr_codigo INT NOT NULL,
    bt_ativo BIT NOT NULL
);

CREATE TABLE tb_empresa (
    id_empresa INT IDENTITY(1,1) PRIMARY KEY,
    id_login INT NOT NULL,
    ds_razao_social VARCHAR(255) NOT NULL,
    ds_cnpj VARCHAR(18) NOT NULL,
    ds_inscricao VARCHAR(20) NOT NULL,
    ds_endereco VARCHAR(255) NOT NULL,
    ds_numero VARCHAR(10) NOT NULL,
    ds_bairro VARCHAR(100) NOT NULL,
    ds_cep VARCHAR(9) NOT NULL,
    ds_cidade VARCHAR(100) NOT NULL,
    ds_estado VARCHAR(2) NOT NULL,
    ds_telefone VARCHAR(20),
    ds_celular VARCHAR(20),
    ds_acordo VARCHAR(50),
    dt_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
    ds_foto VARCHAR(255),
    bt_ativo BIT NOT NULL,
    ds_situacao VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_login) REFERENCES tb_login(id_login)
);

CREATE TABLE tb_filial (
    id_filial INT IDENTITY(1,1) PRIMARY KEY,
    id_empresa INT NOT NULL,
    ds_razao_social VARCHAR(255) NOT NULL,
    ds_cnpj VARCHAR(18) NOT NULL,
    ds_inscricao VARCHAR(20) NOT NULL,
    ds_endereco VARCHAR(255) NOT NULL,
    ds_numero VARCHAR(10) NOT NULL,
    ds_bairro VARCHAR(100) NOT NULL,
    ds_cep VARCHAR(9) NOT NULL,
    ds_cidade VARCHAR(100) NOT NULL,
    ds_estado VARCHAR(2) NOT NULL,
    ds_telefone VARCHAR(20),
    ds_celular VARCHAR(20),
    ds_acordo VARCHAR(50),
    dt_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
    ds_foto VARCHAR(255),
    bt_ativo BIT NOT NULL,
    ds_situacao VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES tb_empresa(id_empresa)
);

CREATE TABLE tb_responsavel (
    id_responsavel INT IDENTITY(1,1) PRIMARY KEY,
    id_empresa INT NOT NULL,
    nm_nome VARCHAR(255) NOT NULL,
    ds_cargo VARCHAR(100) NOT NULL,
    ds_email VARCHAR(255) NOT NULL,
    ds_telefone VARCHAR(20),
    tp_role VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES tb_empresa(id_empresa)
);
