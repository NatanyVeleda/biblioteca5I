var obra = require('../model/obra')
var investidor = require('../model/investidor')
var modelo = require('../model/modelo')
var autor = require('../model/autor')

//middleware para buscar obras
function getObras(req, res, next) {
    obra.find({}).lean().exec(function (err, docs) {
        req.obras = docs
        next()
    })
}

function listar(req, res) {
    obra
        .find({})
        .populate('modelo')
        .populate('investidor')
        .populate('autores')
        .lean()
        .exec(function (err, docs) {
            console.log(docs)
            res.render('obra/list.ejs', { "Obras": docs })
        })
}

function filtrar(req, res) {
    obra
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('modelo')
        .populate('Investidor')
        .populate('autores')
        .lean()
        .exec(function (err, docs) {
            res.render('obra/list.ejs', { "Obras": docs })
        })
}

function abrirAdiciona(req, res) {
    investidor
        .find({})
        .lean()
        .exec(function (e, investidors) {
            autor
                .find({})
                .lean()
                .exec(function (e, autores) {
                    modelo
                        .find({})
                        .lean()
                        .exec(function (e, modelos) {
                            res.render("obra/add.ejs", { "Investidors": investidors, "Autores": autores, "Modelos": modelos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoObra = new obra({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        modelo: req.body.modelo,
        investidor: req.body.investidor,
        autores: req.body.autor,
    })
    novoObra.save(function (err) {
        if (err) {
            console.log(err)
            obra.find({}).populate('modelo').populate('investidor').populate('autores').lean().exec(function (err, docs) {
                res.render('obra/list.ejs', { msg: "Problema ao salvar! "+err, Obras: docs })
            })
        } else {
            obra.find({}).populate('modelo').populate('investidor').populate('autores').lean().exec(function (err, docs) {
                res.render('obra/list.ejs', { msg: "Adicionado com sucesso!", Obras: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    investidor.find({}).lean().exec(
        function (e, investidors) {
            autor.find({}).lean().exec(
                function (e, autores) {
                    modelo.find({}).lean().exec(
                        function (e, modelos) {
                            obra.findOne({ _id: req.params.id }).populate('modelo').populate('investidor').populate('autores').exec(
                                function (err, obra) {
                                    res.render('obra/edit.ejs', { 'obra': obra, "Investidors": investidors, "Autores": autores, "Modelos": modelos });
                                });
                        });
                });
        });
}

function edita(req, res) {
    obra.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            modelo: req.body.modelo,
            investidor: req.body.investidor,
            autores: req.body.autores
        }, function (err) {
            if (err) {
                obra.find({}).populate('modelo').populate('investidor').populate('autores').lean().exec(function (err, docs) {
                    res.render('obra/list.ejs', { msg: "Problema ao editar!", Obras: docs })
                })
            } else {
                obra.find({}).populate('modelo').populate('investidor').populate('autores').lean().exec(function (err, docs) {
                    res.render('obra/list.ejs', { msg: "Editado com sucesso!", Obras: docs })
                })
            }
        })
}

function deleta(req, res) {
    obra.findByIdAndDelete(req.params.id, function () {
        obra.find({}).populate('modelo').populate('investidor').populate('autores').lean().exec(function (err, docs) {
            res.render('obra/list.ejs', { msg: "Removido com sucesso!", Obras: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getObras
}