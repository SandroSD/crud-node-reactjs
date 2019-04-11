// load our app server using express
const express = require('express');
const app = express();
require('express-group-routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const users = require('./controller/usuario');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(morgan('short'));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(morgan('combined'));

app.get("/", (req, res) => {
    console.log("Responding to root route");
    res.send("Hello from ROOOT");
});

app.use(users);

const PORT = process.env.PORT || 3003
    // localhost:PORT
app.listen(PORT, () => {
    console.log("Server is up and listening on ..." + PORT);
});