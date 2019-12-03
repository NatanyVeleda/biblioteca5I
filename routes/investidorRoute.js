var express = require('express')
var route = express.Router()
var investidorCtr = require('../control/investidorCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',investidorCtr.getInvestidors, investidorCtr.listar)

//rota para listar todos
route.get('/', investidorCtr.listar)

//rota para listar por filtro
route.post('/', investidorCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', investidorCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), investidorCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', investidorCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), investidorCtr.edita)

//rota para deletar
route.get('/del/:id', investidorCtr.deleta)

module.exports = route;