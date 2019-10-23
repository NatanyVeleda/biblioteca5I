const conexao = require('./conexao')

var livro = conexao.Schema({
    titulo:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    genero:{
        type:conexao.Schema.Types.ObjectId,
        ref:"genero"
    },
    editora:{
        type:conexao.Schema.Types.ObjectId,
        ref:"editora"
    },
    autores:[conexao.Schema.Types.ObjectId]
})