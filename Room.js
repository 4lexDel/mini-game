module.exports =
    class Room {
        static rooms = []

        constructor(id, access, playerLimit) {
            this.id = id;
            this.access = access;

            this.players = [];

            this.playerLimit = playerLimit;
            if (this.playerLimit < 2) this.playerLimit = 2;
            else if (this.playerLimit > 100) this.playerLimit = 100;

            Room.rooms.push(this);
        }

        addPlayer(player) {
            player.roomID = this.id;
            this.players.push(player);
        }

        removePlayer(id) {
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].id == id) {
                    console.log(i);
                    console.log('test delete ' + this.players);
                    this.players = this.players.slice(0, i).concat(this.players.slice(i + 1));
                    console.log('test delete ' + this.players);
                    return true;
                }
            }
            return false;
        }

        isEmpty() {
            if (this.players.length <= 0) return true;
            return false;
        }

        isFull() {
            if (this.players.length >= this.playerLimit) return true;
            return false;
        }

        static removeRoom(id) {
            for (let i = 0; i < Room.rooms.length; i++) {
                if (Room.rooms[i].id == id) Room.rooms.splice(i, 1); //MODULER ==> voir passage par ref ???????
            }
        }

        static selectRoom(id) {
            for (let i = 0; i < Room.rooms.length; i++) {
                if (Room.rooms[i].id == id) return Room.rooms[i];
            }
        }
    }