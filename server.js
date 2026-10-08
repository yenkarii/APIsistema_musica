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

app.get("./", (req, res) =>{
    res.status(200).json({mensagem: "Oba!!"});
});

app.get("/artistas", (req, res) =>{
    const sql = "SELECT * FROM artistas";

    conexao.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao listar artistas"});
        }
        res.json(resultado);
    });
});

app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM artistas WHERE id = ${id}`;

    conexao.query(sql, (erro, resultado) =>{
        if(erro){
            return res.status(500).json({erro: "Erro ao listar artistas"})
        };
        if(resultado.length === 0){
            return res.status(404).json({
                erro: "Artista não encontrado ou inexistente"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.post("/artistas", (req, res) => {

    const { nome, genero, pais } = req.body;
    if(!nome || !genero || !pais){
        return res.status(400).json({
            mensagem: "Informe nome, gênero musical e país de origem"
        });
    }

    const sql = `INSERT INTO artistas (nome, genero, pais) VALUES (?,?,?)`;

        conexao.query(sql, [nome, genero, pais], (erro, resultado) =>{
        if(erro){
            return res.status(500).json({erro: "Erro ao listar artistas"})
        };
        if(resultado.length === 0){
            return res.status(404).json({
                erro: "Artista não encontrado ou inexistente"
            });
        }
        res.status(200).json(resultado[0]);
    });

});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost${PORT}`)
});