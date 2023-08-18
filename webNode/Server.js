const express = require('express');
const bodyParse = require('body-parser');
const schema = require('schema');
const sdk = require('api')('@devpagbank/v2.2#4m4i2mll5ix4rz');
const morgan = require('morgan');
const session = require('express-session')
const transation = require("./Models/Transation.js")
const app = express();

app.use(morgan("dev"));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
require("./app/controllers/index")


//#region Configuration //
var port = process.env.PORT || 3000;

app.get('/buy', function (req, res) {
    console.log(req.body.body);
});

app.post('/buy', function (req, res) {
    var objeto = [{
        cliente: [],
        phone: [],
        pedido: []
    }]
    objeto = req.body;
    FilterProduct(objeto.pedido)
    res.status(200).send("Processando Pedido Encontrado")
});
function FilterProduct(pedido) {
    var t = new transation()
    t.pagamentoRequest(pedido);
}

app.listen(port, ()=>
{
    console.log(`Listering Port ${port}`);
});