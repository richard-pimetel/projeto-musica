create database db_controle_musicas_ba;

use db_controle_musicas_ba;

create table tbl_musica(
  id int primary key auto_increment,
  nome varchar(80) not null,
  link varchar(200) not null,
  duracao time not null,
  data_lancamento date not null,
  foto_capa varchar(200),
  letra text
);

-- Tipos de Usuário
CREATE TABLE tbl_tipo_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50) UNIQUE NOT NULL
);

-- Usuários
CREATE TABLE tbl_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao DATE NOT NULL
);
-- Álbuns
CREATE TABLE tbl_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_lancamento DATE NOT NULL,
    capa VARCHAR(200)
);
-- Artistas
CREATE TABLE tbl_artista (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    biografia TEXT,
    foto_perfil VARCHAR(200)
);
-- Gêneros Musicais
CREATE TABLE tbl_genero (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_genero VARCHAR(50) NOT NULL UNIQUE
);

show tables;
desc tbl_musica;
select * from tbl_musica;