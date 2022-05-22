const { io } = require("./conf");
const Player = require("./Player");

io.on('connection', (socket) => {
    socket.on('send room message', (message) => {
        let player = Player.selectPlayerByID(socket.id);

        console.log("Message de " + player.name + " : " + message);

        io.to(player.roomID).emit('room message', player, message)
    })

    socket.on('send global message', (message) => {
        let player = Player.selectPlayerByID(socket.id);

        console.log("Message de " + player.name + " : " + message);

        io.emit('global message', player, message)
    })
})