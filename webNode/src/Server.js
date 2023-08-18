const express = require('express');
const bodyParse = require('body-parser');
const schema = require('schema');
const sdk = require('api')('@devpagbank/v2.2#4m4i2mll5ix4rz');
const morgan = require('morgan');
const app = express();

app.use(morgan("dev"));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
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
    if (objeto.pedido == null) {
        console.log("Nenhum Pedido Encontrado")
        res.status(400).send("Nenhum Pedido Encontrado")
    }
    if (objeto.pedido != null) {
        console.log("Processando Pedido Encontrado")
        FilterProduct(objeto.pedido)
        res.status(200).send("Processando Pedido Encontrado")
    }
});
async function FilterProduct(pedido) {
    await console.log(pedido)
}

app.listen(port, ()=>
{
    console.log(`Listering Port ${port}`);
});