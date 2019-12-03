const conexao = require('./conexao')

var obra = conexao.Schema({
    titulo:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    modelo:{
        type:conexao.Schema.Types.ObjectId,
        ref:"modelo"
    },
    investidor:{
        type:conexao.Schema.Types.ObjectId,
        ref:"investidor"
    },
    autores:[{
        type:conexao.Schema.Types.ObjectId,
        ref:"autor"
    }]
})

module.exports = conexao.model("obra",obra)