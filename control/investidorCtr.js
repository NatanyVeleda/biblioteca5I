var investidor = require('../model/investidor')


//middleware para buscar investidors
function getInvestidors(req, res, next) {
    investidor.find({}).lean().exec(function (err, docs) {
        req.investidors = docs
        next()
    })
}

function listar(req, res) {
    investidor.find({}).lean().exec(function (err, docs) {
        res.render('investidor/list.ejs', { "Investidors": docs })
    })
}

function filtrar(req, res) {
    investidor.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('investidor/list.ejs', { "Investidors": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("investidor/add.ejs")
}

function adiciona(req, res) {
    var novoInvestidor = new investidor({
        nome: req.body.nome,
        endereco: req.body.endereco,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoInvestidor.save(function (err) {
        if (err) {
            investidor.find({}).lean().exec(function (err, docs) {
                res.render('investidor/list.ejs', { msg: "Problema ao salvar!", Investidors: docs })
            })
        } else {
            investidor.find({}).lean().exec(function (err, docs) {
                res.render('investidor/list.ejs', { msg: "Adicionado com sucesso!", Investidors: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    investidor.findById(req.params.id, function (err, investidor) {
        res.render('investidor/edit.ejs', { 'investidor': investidor });
    })
}

function edita(req, res) {
    investidor.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                investidor.find({}).lean().exec(function (err, docs) {
                    res.render('investidor/list.ejs', { msg: "Problema ao editar!", Investidors: docs })
                })
            } else {
                investidor.find({}).lean().exec(function (err, docs) {
                    res.render('investidor/list.ejs', { msg: "Editado com sucesso!", Investidors: docs })
                })
            }
        })
}

function deleta(req, res) {
    investidor.findByIdAndDelete(req.params.id, function () {
        investidor.find({}).lean().exec(function (err, docs) {
            res.render('investidor/list.ejs', { msg: "Removido com sucesso!", Investidors: docs })
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
    getInvestidors
}