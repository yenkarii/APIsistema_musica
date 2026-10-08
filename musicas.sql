CREATE DATABASE sistema_musica;
USE sistema_musica;

CREATE TABLE artistas (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
genero VARCHAR(50) NOT NULL, 
pais VARCHAR(50) NOT NULL
);

INSERT INTO artistas (nome, genero, pais) VALUES
('Ye', 'Hip-hop', 'Estados Unidos'),
('Panchiko', 'Indie rock', 'Reino Unido'),
('MF DOOM', 'Hip-hop', 'Reino Unido'); 

CREATE TABLE albuns (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100) NOT NULL, 
ano_lancamento INT NOT NULL,
artista_id INT NOT NULL,
FOREIGN KEY (artista_id) REFERENCES artistas(id)
);

INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES
('BULLY', 2026, 1),
('D>E>A>T>H>M>E>T>A>L', 2000, 2),
('MM... FOOD', 2004, 3);

CREATE TABLE musicas (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
duracao VARCHAR(10) NOT NULL,
album_id INT NOT NULL,
FOREIGN KEY(album_id) REFERENCES albuns(id)
);

INSERT INTO musicas (titulo, duracao, album_id) VALUES
('ALL THE LOVE', '3:49', 1),
('MISSION CONTROL', '1:53', 1),
('D>E>A>T>H>M>E>T>A>L', '4:22', 2),
('Laputa', '2:44', 2),
('Hoe Cakes', '3:55', 3),
('One Beer', '4:19', 3); 