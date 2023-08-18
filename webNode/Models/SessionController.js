const express = require("express")
const session = require('express-session')
const sdk = require('api')('@devpagbank/v2.2#4m4i2mll5ix4rz');

var PORT = process.env.port || 3000

// Session Setup
app.use(session({
    secret: 'Your_Secret_Key',
    resave: true,
    saveUninitialized: true
}))

app.get("/", function(req, res){

    // req.session.key = value
    req.session.name = 'GeeksforGeeks'
    return res.send("Session Set")
})

app.get("/session", function(req, res){


    var name = req.session.name
    return res.send(name)
})

app.listen(PORT, function(error){
    if(error) throw error
    console.log("Server created Successfully on PORT :", PORT)
});