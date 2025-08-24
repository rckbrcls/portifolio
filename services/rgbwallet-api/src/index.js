/**
 * Arquivo principal que chama as rotas e realiza os server.use
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routers/router');

// Init DB connection (must run before routes)
require('./connections/database');

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use('/', router);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server no ar na porta ${PORT}`)
})