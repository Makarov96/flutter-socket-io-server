'use strict'
const express = require('express');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public')
require('dotenv').config();
//app de express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


app.use(express.static(publicPath))
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err)
    console.log(`server listen on http://localhost:${process.env.PORT}`)
})