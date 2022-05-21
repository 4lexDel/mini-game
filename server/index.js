const { app, open, express, server, io } = require("./conf");

app.use(express.static("public"));
app.use(express.static("public/game"));

const port = 5000;

(async() => {
    await open('http://localhost:' + port + '/');
})();

server.listen(port, 'localhost', () => { //SERVEUR
    console.log('Ecoute sur le port ' + port);
});