const express = require('express');
const bodyParse = require('body-parser');
const validator = require('validator');

//#region Configuration //
var port = process.env.PORT || 3000;
const app = express();

app.get('/buy', function (req, res) {
    console.log(res.body);
});
app.post('/buy', function (req, res) {
    var bd = {};
    bd = req.body;
    console.log(bd);
});
app.listen(port, ()=>
{
    console.log(`Listering Port ${port}`);
});