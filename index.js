const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var modeloRoute = require('./routes/modeloRoute')
var autorRoute = require('./routes/autorRoute')
var investidorRoute = require('./routes/investidorRoute')
var obraRoute = require('./routes/obraRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/modelo',modeloRoute)
app.use('/autor',autorRoute)
app.use('/investidor',investidorRoute)
app.use('/obra',obraRoute)