const { express, open, app, io, server } = require("./conf");
const Player = require("./Player");
const Room = require("./Room");

app.use(express.static("public"));

const port = 5000;

(async() => {
    //await open('http://localhost:' + port + '/');
})();

server.listen(port, 'localhost', () => { //SERVEUR
    console.log('Ecoute sur le port ' + port);
});

function getPublicPath() {
    var test = __dirname.split("\\");
    test.pop();
    test.push("public");
    return test.join("\\");
}

app.get('/', (req, res) => {
    //res.sendFile(getPublicPath() + "/game");
    //req.socket.localAddress;
    res.sendFile(getPublicPath() + "/index.html");
});

require('./chat'); //Utilisation du systeme de chat

io.on('connection', (socket) => {
    console.log("Bonjour " + socket.id); //Première connexion

    socket.on("disconnect", async() => {
        console.log("Au revoir " + socket.id)
        let player = Player.selectPlayerByID(socket.id);

        if (player != undefined) {

            if (player.roomID != undefined) {
                let room = Room.selectRoom(player.roomID); //Room du player
                socket.leave(player.roomID);

                room.removePlayer(socket.id); //Player enlevé du cache de la room

                if (room.isEmpty()) {
                    console.log("REMOVE IT !");
                    Room.removeRoom(room.id);
                } else io.to(room.id).emit('players list', Object.values(room.players)); //Liste refresh pour les joueurs restants

            }
            Player.removePlayer(socket.id);

            console.log("Nettoyage terminé !");

            console.log(Player.players);
        }
    });

    socket.on('create room', (roomID, pseudo) => {
        console.log("Create : " + roomID + " : " + io.sockets.adapter.rooms.has(roomID));

        if (!io.sockets.adapter.rooms.has(roomID)) { //On verifie que la room n'existe pas
            console.log("SUCCESS")
            io.to(socket.id).emit('room created', true); //Accusé reception

            socket.join(roomID, function(res) {
                console.log("joined successfully ");
            }); //Le createur de la room la rejoint automatiquement

            let newRoom = new Room(roomID);
            let player = Player.selectPlayerByID(socket.id);
            if (player != undefined) {
                player.name = pseudo;
                console.log(pseudo);
                newRoom.addPlayer(player);
                refreshPlayerList(newRoom); //Liste refresh
            }
        } else {
            console.log("Failed")
            io.to(socket.id).emit('room created', false);
        }
    });

    socket.on('join room', (roomID, pseudo) => {
        console.log("Join : " + roomID + " : " + io.sockets.adapter.rooms.has(roomID));
        if (io.sockets.adapter.rooms.has(roomID) && Player.selectPlayerByID(socket.id).roomID == undefined) {
            console.log("SUCCESS")
            io.to(socket.id).emit('room joined', true); //EMPECHER DE REJOINDRE LA MEME ??

            socket.join(roomID);
            let room = Room.selectRoom(roomID);
            let player = Player.selectPlayerByID(socket.id);
            player.name = pseudo;

            room.addPlayer(player); ///////

            refreshPlayerList(room); //Liste refresh
        } else {
            console.log("Failed")
            io.to(socket.id).emit('room joined', false);
        }
    });
})

async function pause(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function refreshPlayerList(room) {
    if (room.id != undefined) io.to(room.id).emit('players list', Object.values(room.players)); //Liste refresh
} //Faut que la room existe