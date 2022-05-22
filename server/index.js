const { express, open, app, io, server } = require("./conf");
const Player = require("./Player");
const Room = require("./Room");

const { v4: uuidv4 } = require('uuid');

app.use(express.static("public"));

const port = 5000;

(async() => {
    await open('http://localhost:' + port + '/');
})();

server.listen(port, 'localhost', () => { //SERVEUR
    console.log('Ecoute sur le port ' + port);
});

require('./chat'); //Utilisation du systeme de chat

io.on('connection', (socket) => {
    console.log("Bonjour " + socket.id); //Première connexion

    let a = new Player(socket.id, "guest" + socket.id);

    socket.on('start-session', (data) => {
        console.log("============start-session event================");
        console.log(data);
        if (data.sessionId == null || data.sessionId == "null") { //1iere connexion
            let sessionIDGenerate = uuidv4(); //generating the sessions_id and then binding that socket to that sessions 

            console.log(sessionIDGenerate);

            //Recup le player
            let player = Player.selectPlayerByID(socket.id);

            if (player != undefined) {
                player.sessionID = sessionIDGenerate;
                player.id = socket.id;

                console.log(player);

                socket.emit("set-session-acknowledgement", { sessionId: player.sessionID, name: player.name, roomID: player.roomID });
            }
            //socket.room = session_id;
        } else { //N connexion
            let player = Player.selectPlayerBySessionID(data.sessionId);

            if (player != undefined) {
                player.id = socket.id; //Nouvel socket donc id à actualiser

                console.log("Je te reconnais : " + player.name + " from : " + player.roomID);

                if (player.roomID != undefined) {
                    socket.join(player.roomID, function(res) {
                        console.log("joined successfully ");
                    })
                    refreshPlayerList(Room.selectRoom(player.roomID));
                }
                socket.emit("set-session-acknowledgement", { sessionId: data.sessionId, name: player.name, roomID: player.roomID });
            }
        }
    });

    socket.on("disconnect", () => {
        console.log("Au revoir " + socket.id)

        /*let player = Player.selectPlayerByID(socket.id); //Player à potentiellement delete

        if (player != undefined && player.roomID != undefined) {
            let room = Room.selectRoom(player.roomID); //Room du player
            socket.leave(player.roomID);

            room.removePlayer(socket.id); //Player enlevé du cache de la room

            io.to(room.id).emit('players list', Object.values(room.players)); //Liste refresh pour les joueurs restants

            if (room.isEmpty()) {
                console.log("REMOVE IT !"); //////////////////////////////////////////////////////////////
                Room.removeRoom(room.id);
            }
        }

        Player.removePlayer(socket.id);*/
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
            player.name = pseudo;

            console.log(pseudo);

            newRoom.addPlayer(player);

            refreshPlayerList(newRoom); //Liste refresh
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

function refreshPlayerList(room) {
    if (room.id != undefined) io.to(room.id).emit('players list', Object.values(room.players)); //Liste refresh
} //Faut que la room existe