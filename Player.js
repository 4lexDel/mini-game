module.exports =
    class Player {
        static players = []

        constructor(id, name) {
            this.id = id;
            this.name = name;
            this.roomID;

            Player.players.push(this);
            console.log("TEST : " + Player.players.length)
        }

        static removePlayer(id) {
            console.log("Remove action");
            for (let i = 0; i < Player.players.length; i++) {
                if (Player.players[i].id == id) Player.players = Player.players.slice(0, i).concat(Player.players.slice(i + 1));
            }
        }

        static selectPlayerByID(id) {
            for (let i = 0; i < Player.players.length; i++) {
                if (Player.players[i].id == id) return Player.players[i];
            }
        }

        static selectPlayerBySessionID(id) {
            for (let i = 0; i < Player.players.length; i++) {
                if (Player.players[i].sessionID == id) return Player.players[i];
            }
        }
    }