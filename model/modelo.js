const conexao = require('./conexao')

var modelo = conexao.Schema({
    nome:{
        type:String
    }
})

module.exports = conexao.model("modelo",modelo)