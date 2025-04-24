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
    data_criacao DATE
);

-- Tabela intermediária entre Usuários e Tipos de Usuário
CREATE TABLE tbl_usuario_tipo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_tipo_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_tipo_usuario) REFERENCES tbl_tipo_usuario(id) ON DELETE RESTRICT
);

-- Artistas
CREATE TABLE tbl_artista (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_artistico VARCHAR(100) NOT NULL,
    biografia TEXT,
    foto_perfil VARCHAR(200)
);

-- Tabela intermediária entre Usuários e Artistas
CREATE TABLE tbl_usuario_artista (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_artista INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

-- Álbuns
CREATE TABLE tbl_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_album VARCHAR(100) NOT NULL,
    data_lancamento DATE NOT NULL,
    capa VARCHAR(200)
);

-- Tabela intermediária entre Álbuns e Artistas
CREATE TABLE tbl_album_artista (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_album INT NOT NULL,
    id_artista INT NOT NULL,
    FOREIGN KEY (id_album) REFERENCES tbl_album(id),
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

-- Músicas
CREATE TABLE tbl_musica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    link VARCHAR(200) NOT NULL,
    duracao TIME NOT NULL,
    data_lancamento DATE NOT NULL,
    foto_capa VARCHAR(200),
    letra TEXT
);

-- Tabela intermediária entre Músicas e Álbuns
CREATE TABLE tbl_musica_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_musica INT NOT NULL,
    id_album INT NOT NULL,
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),
    FOREIGN KEY (id_album) REFERENCES tbl_album(id)
);

-- Tabela intermediária entre Músicas e Artistas
CREATE TABLE tbl_musica_artista (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_musica INT NOT NULL,
    id_artista INT NOT NULL,
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

-- Playlists
CREATE TABLE tbl_playlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome_playlist VARCHAR(100) NOT NULL,
    data_criacao DATE,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id)
);

-- Músicas em Playlists
CREATE TABLE tbl_playlist_musica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_playlist INT NOT NULL,
    id_musica INT NOT NULL,
    FOREIGN KEY (id_playlist) REFERENCES tbl_playlist(id),
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id)
);

-- Gêneros Musicais
CREATE TABLE tbl_genero (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_genero VARCHAR(50) NOT NULL UNIQUE
);

-- Associação entre Músicas e Gêneros (Muitos-para-Muitos)
CREATE TABLE tbl_musica_genero (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_musica INT NOT NULL,
    id_genero INT NOT NULL,
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

-- Favoritos
CREATE TABLE tbl_favoritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_musica INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id)
);

-- Avaliações
CREATE TABLE tbl_avaliacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_musica INT NOT NULL,
    nota INT CHECK (nota BETWEEN 1 AND 5),
    data_avaliacao DATE,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id)
);

-- Seguidores (Usuários seguindo artistas)
CREATE TABLE tbl_seguindo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_artista INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);
