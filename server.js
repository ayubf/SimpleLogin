const express = require('express');
const server = express();

const mainRouter = require('./routes/main');

server.set('view engine', 'ejs');

server.use(express.urlencoded({extended :false}));

server.use('/', mainRouter);
server.use(express.static("public"));

server.listen(3000);
