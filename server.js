const express = require("express")
const cors = require("cors");
const conexao = require("./db.js");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json()); // o middleware
// função executada antes da rota que autoriza ou bloqueia
//  requisições de origens (domínios) doiferentes 
// daqueles onde a API está hospedada



app.get("./", (req, res) => {
    res.status(200).json({ mensagem: "Oba!!" });
});

// COMANDOS ARTISTAS

app.get("/artistas", (req, res) => {
    const sql = "SELECT * FROM artistas";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao listar artistas" });
        }
        res.status(200).json(resultado);
    });
});

app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM artistas WHERE id = ${id}`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao listar artistas" })
        };
        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Artista não encontrado ou inexistente"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.post("/artistas/", (req, res) => {

    const sql = `INSERT INTO artistas (nome, genero, pais) VALUES (?, ?, ?)`;
    const { nome, genero, pais } = req.body;
    if (!nome || !genero || !pais) {
        return res.status(400).json({
            mensagem: "Informe nome, gênero musical e país de origem"
        });
    }



    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao listar artistas" })
        }
        res.status(200).json({
            mensagem: "Artista cadastrado com sucesso!",
            id: resultado.insertId
        });
    });

});

app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'UPDATE artistas SET nome = ?, genero = ?, pais = ? WHERE id = ?'

    const { nome, genero, pais } = req.body;

    if (!nome || !genero || !pais) {
        return res.status(400).json({ erro: "Informe nome, gênero musical e país de origem artista." })
    }

    conexao.query(sql, [nome, genero, pais, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: "Erro ao atualizar artistas" })
        };
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Artista não encontrado ou inexistente"
            });
        }
        res.status(200).json(resultado);
    });
});

app.delete("/artistas/", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'DELETE FROM artistas WHERE id = ?';

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao apagar artistas" })
        };
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Artista não encontrado ou inexistente"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.get("/artistas/:id/albuns", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM albuns WHERE artista_id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao mostrar todos os álbuns de algum artista!"});
        }
        if(resultado.length === 0){
            return res.status(404).json({erro: "Artista não encontrado ou inexistente."});
        }
        res.status(200).json(resultado);
    });
});

app.get("/artistas/:id/musicas", (req, res) => {
    const id = Number(req.params.id);
    const sql = `
    SELECT 
        musicas.* FROM musicas 
    INNER JOIN albuns
    ON musicas.album_id = albuns.id 
    WHERE albuns.artista_id = ?`; 

    conexao.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao mostrar todas as músicas de algum artista!"});
        }
        if(resultado.length === 0){
            return res.status(404).json({erro: "Artista não encontrado ou inexistente."});
        }
        res.status(200).json(resultado);
    });
});


// !! ----------------------------------- !! 
// COMANDOS ALBUNS

app.get("/albuns", (req, res) => {
    const sql = 'SELECT * FROM albuns';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao listar artistas" })
        }
        res.status(200).json(resultado);
    });
});

app.get("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'SELECT * FROM albuns WHERE id = ?'

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao listar álbum" });
        }
        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Álbum não encontrado ou inexistente"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.post("/albuns/", (req, res) => {
    const sql = 'INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES (?, ?, ?)';

    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!titulo || !ano_lancamento || !artista_id) {
        return res.status(400).json({
            erro: "Informe título, ano de lançamento e id do artista"
        });
    }

    conexao.query(sql, [titulo, ano_lancamento, artista_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao cadastrar álbum!" })
        }
        res.status(200).json({
            mensagem: "Álbum cadastrado com sucesso!",
            id: resultado.insertId
        });
    });
});

app.put("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'UPDATE albuns SET titulo = ?, ano_lancamento = ?, artista_id = ? WHERE id = ?'

    const { titulo, ano_lancamento, artista_id } = req.body;

    if(!titulo || !ano_lancamento || !artista_id){
        return res.status(400).json({erro: "Informe título, ano de lançamento e id do artista"})
    }

    conexao.query(sql, [titulo, ano_lancamento, artista_id, id], (erro, resultado) => {
    
        if(erro){
            return res.status(500).json({erro: "Erro ao atualizar álbum"})
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({erro: "Álbum não encontrado ou inexistente"});
        }

        return res.status(200).json(resultado);
    });
});

app.delete("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'DELETE FROM albuns WHERE id = ?'

    conexao.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao apagar álbum"})
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({erro: "Álbum não encontrado ou inexistente"})
        }
        res.status(200).json(resultado);
    })
})

// !! ----------------------------------- !! 
// COMANDOS MUSICAS

app.get("/musicas", (req, res) => {
    const sql = 'SELECT * FROM musicas'

    conexao.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao listar músicas"});
        }
        res.status(200).json(resultado);
    });
});

app.get("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'SELECT * FROM musicas WHERE id = ?';

    conexao.query(sql,[id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao listar música específica"});
        }
        if(resultado.length === 0)
        {
            return res.status(404).json({erro: "Música não encontrada ou inexistente."});
        }
        res.status(200).json(resultado);
    });
});

app.post("/musicas", (req, res) => {
    const id = Number(req.params.id);

    const sql = 'INSERT INTO musicas (titulo, duracao, album_id) VALUES (?, ?, ?)'
    const { titulo, duracao, album_id } = req.body;
    if(!titulo || !duracao ||!album_id){
        return res.status(400).json({erro: "Informe título, duração (mm:ss) e o id do álbum respectivo."});
    }

    conexao.query(sql, [titulo, duracao, album_id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao cadastrar música!"});
        }
        res.status(200).json({
            mensagem: "Música cadastrada com sucesso!",
            id: resultado.insertId});
    });
});

app.put("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = 'UPDATE musicas SET titulo = ?, duracao = ?, album_id = ? WHERE id = ?';
    const { titulo, duracao, album_id } = req.body;
    if(!titulo || !duracao || !album_id){
        return res.status(400).json({erro: "Informe título, duração (mm:ss) e id do álbum respectivo."})
    }
    conexao.query(sql, [titulo, duracao, album_id, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao atualizar música!"});
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({erro: "Música não encontrada ou inexistente."})
        }

        res.status(200).json(resultado);
    });
});

app.get("/musicas-completas/:id", (req, res) => {

    // nome da música
    // duração
    // título do álbum
    // ano de lançamento
    // nome do artista
    // gênero do artista
    // país do artista
    const id = Number(req.params.id);
const sql = `
        SELECT 
            musicas.id, 
            musicas.titulo AS musica, 
            musicas.duracao, 
            albuns.titulo AS album, 
            albuns.ano_lancamento, 
            artistas.nome AS artista, 
            artistas.genero, 
            artistas.pais 
        FROM musicas 
        INNER JOIN albuns ON musicas.album_id = albuns.id 
        INNER JOIN artistas ON albuns.artista_id = artistas.id
        WHERE musicas.id = ?
    `;

    conexao.query(sql, [id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao mostrar música e outras informações!"});
        }
        if(resultado.length === 0){
            return res.status(404).json({erro: "Música não encontrada ou inexistente"});
        }
        res.status(200).json(resultado);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost${PORT}`)
});