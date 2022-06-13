const { express, open, app, io, server, path } = require("./conf");
const Player = require("./Player");
const Room = require("./Room");

// app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use("/static", express.static(path.resolve(__dirname, "public", "static")));
//app.use(express.static("public/js"));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const port = 5000;

(async() => {
    //await open('http://localhost:' + port + '/');
})();

server.listen(port, 'localhost', () => { //SERVEUR
    console.log('Ecoute sur le port ' + port);
});

require('./chat'); //Utilisation du systeme de chat

io.on('connection', (socket) => {
    console.log("Bonjour " + socket.id); //Première connexion
    new Player(socket.id, "guest" + socket.id);

    socket.on("disconnect", async() => {
        console.log("Au revoir " + socket.id)
        let player = Player.selectPlayerByID(socket.id);

        if (player != undefined) {
            console.log("Player définis");
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

    socket.on('create room', (roomID, pseudo, access, playerNumber) => {
        console.log("Create : " + roomID + " : " + io.sockets.adapter.rooms.has(roomID));

        if (!io.sockets.adapter.rooms.has(roomID)) { //On verifie que la room n'existe pas
            console.log("SUCCESS")
            io.to(socket.id).emit('room created', true); //Accusé reception

            socket.join(roomID, function(res) {
                console.log("joined successfully ");
            }); //Le createur de la room la rejoint automatiquement

            let newRoom = new Room(roomID, access, playerNumber);
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
        let room = Room.selectRoom(roomID);

        if (io.sockets.adapter.rooms.has(roomID) &&
            Player.selectPlayerByID(socket.id).roomID == undefined &&
            !room.isFull()) { //On test la limite

            console.log("SUCCESS");
            io.to(socket.id).emit('room joined', true); //EMPECHER DE REJOINDRE LA MEME ??

            socket.join(roomID);
            let player = Player.selectPlayerByID(socket.id);
            player.name = pseudo;

            room.addPlayer(player); ///////

            refreshPlayerList(room); //Liste refresh
        } else {
            console.log("Failed")
            io.to(socket.id).emit('room joined', false);
        }
    });

    socket.on('leave room', () => { //Code similaire à la déco à quelques détails près
        console.log("Deco de room " + socket.id)
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
        }
        Player.selectPlayerByID(socket.id).roomID = undefined; //Pour les fois d'apres tres important !!
    })
})

async function pause(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

setInterval(() => { //PERFORMANCE ??
    Room.rooms.forEach(room => {
        refreshPlayerList(room);
    });
}, 1000);

setInterval(() => { //PERFORMANCE ??
    let publicRooms = Room.rooms.filter(room => room.access == false);

    io.emit('rooms list', Object.values(publicRooms)); //Liste refresh
}, 1000);

function refreshPlayerList(room) {
    if (room.id != undefined) io.to(room.id).emit('players list', Object.values(room.players)); //Liste refresh
} //Faut que la room existe