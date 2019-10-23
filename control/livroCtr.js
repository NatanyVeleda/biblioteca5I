var livro = require('../model/livro')
var genero = require('../model/genero')
var autor = require('../model/autor')
var editora = require('../model/editora')

function listar(req, res) {
   
}

function filtrar(req, res) {
   
}

function abrirAdiciona(req, res) {
    genero.find({}).lean().exec(
        function(err,generos){
            autor.find({}).lean().exec(
                function(err,autores){
                    editora.find({}).lean().exec(
                        function(err,editoras){
                            res.render('livro/add.ejs',{
                                'generos':generos,
                                'autores':autores,
                                'editoras':editoras
                            })
                        }
                    )
                }
            )
        }
    )
}

function adiciona(req, res) {
    
}

function abrirEdita(req, res) {
    
}

function edita(req, res) {
    
}

function deleta(req, res) {

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta
}