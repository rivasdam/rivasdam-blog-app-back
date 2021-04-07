const routes = require('./routes/index.js');
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

app.get("/url", (req,res,next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

routes(app);

const port = process.env.PORT || '3000'; 

app.listen(port);

console.log("Server running on port 3000");
