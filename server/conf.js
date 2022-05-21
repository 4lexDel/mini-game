var express = require('express');
const open = require('open');

var app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

module.exports = { express, open, app, io, server };