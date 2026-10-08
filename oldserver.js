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

let ARTISTAS = [
    {
        id: 1,
        nome: "Ye",
        genero: "Hip-hop",
        pais: "Estados Unidos",
    },
    {
        id: 2,
        nome: "Panchiko",
        genero: "Indie rock",
        pais: "Reino Unido",
    },
    {
        id: 3,
        nome: "MF DOOM",
        genero: "Hip-hop",
        pais: "Reino Unido",
    },
];

let ALBUNS = [
    {
        id: 1,
        titulo: "BULLY",
        ano_lancamento: 2026,
        artista_id: 1,
    },
    {
        id: 2,
        titulo: "D>E>A>T>H>M>E>T>A>L",
        ano_lancamento: 2000,
        artista_id: 2,
    },
    {
        id: 3,
        titulo: "MM... FOOD",
        ano_lancamento: 2004,
        artista_id: 3,
    },
]

let MUSICAS = [
    {
        titulo: "ALL THE LOVE",
        duracao: "3:49",
        album_id: 1,
    },
    {
        titulo: "MISSION CONTROL",
        duracao: "1:53",
        album_id: 1,
    },
    {
        titulo: "D>E>A>T>H>M>E>T>A>L",
        duracao: "4:22",
        album_id: 2,
    },
    {
        titulo: "Laputa",
        duracao: "2:44",
        album_id: 2,
    },
    {
        titulo: "Hoe Cakes",
        duracao: "3:55",
        album_id: 3,
    },
    {
        titulo: "One Beer",
        duracao: "4:19",
        album_id: 3,
    },
]

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "Servidor responde! Obaaaaa :D" })
}); ''

// --------------------------------------------------------------
// COMANDOS ARTISTAS

app.get("/artistas", (req, res) => {
    res.status(200).json(ARTISTAS);
});

app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id)
    const artista = ARTISTAS.find(p => p.id === id)

    if (!artista) {
        return res.status(404).json({ mensagem: "Artista não encontrado ou inexistente." })
    }

    res.status(200).json(artista)
});

// AQUI COMEÇA O POST /ARTISTAS

app.post("/artistas", (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ mensagem: "BODY não pode ser vazio! Insira nome, gênero musical e país de origem do artista!!" });
    }

    const { nome, genero, pais } = body;
    if (!nome || !genero || !pais) {
        return res.status(400).json({
            mensagem: "Informe nome, gênero musical e país de origem do artista."
        });
    }

    const novoId = ARTISTAS.length > 0
        ? ARTISTAS[ARTISTAS.length - 1].id + 1 : 1;

    const novoArtista = {
        id: novoId,
        nome: nome.trim(),
        genero: genero.trim(),
        pais: pais.trim(),
    }

    ARTISTAS.push(novoArtista);
    res.status(201).json({
        mensagem: "Artista cadastrado!",
        artista: novoArtista,
    });
});

// AQUI ACABA O POST /ARTISTAS

//AQUI COMEÇA O PUT /ARTISTAS

app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = ARTISTAS.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(400).json({
            mensagem: "Artista não encontrado ou inexistente"
        })
    };

    const { nome, genero, pais } = req.body;

    if (!nome || !genero || !pais) {
        return res.status(400).json({ mensagem: "Informe nome, gênero musical e país de origem do artista" })
    };
    ARTISTAS[indice] = {
        id,
        nome,
        genero,
        pais
    };

    res.status(200).json({
        mensagem: "Artista atualizado",
        artista: ARTISTAS[indice]
    });
});

// AQUI ACABA O PUT /ARTISTAS

// --------------------------------------------------------------
// COMANDOS ALBUNS

app.get("/albuns", (req, res) => {
    res.status(200).json(ALBUNS);
});

app.get("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);
    const album = ALBUNS.find(p => p.id === id);

    if (!album) {
        return res.status(404).json({ mensagem: "Álbum não encontrado ou inexistente." });
    }

    res.status(200).json({ album });
})

app.post("/albuns/:id", (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ mensagem: "BODY não pode estar vazio!" })
    }

    const { titulo, ano_lancamento, artista_id } = body;

    if (!titulo || !ano_lancamento || !artista_id) {
        return res.status(404).json({ mensagem: "Informe título, ano de lançamento e ID do artista" });
    }

    const novoId = ALBUNS.length > 0
        ? ALBUNS[ALBUNS.length - 1].id + 1 : 1;

    const novoAlbum = {
        id: novoId,
        titulo: titulo.trim(),
        ano_lancamento: ano_lancamento.trim(),
        pais: artista_id.trim(),
    }

    ALBUNS.push(novoAlbum);
    res.status(201).json({
        mensagem: "Álbum cadastrado!",
        álbum: novoAlbum,
    });
});



// --------------------------------------------------------------
// COMANDOS MUSICAS

app.get("/musicas", (req, res) => {
    res.status(200).json(MUSICAS);
});



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});