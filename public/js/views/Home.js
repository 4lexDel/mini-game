import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return '<h1>Welcome at Home !</h1>';
        /*return `
        <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-6">
                <label class="text-align-center" for="pseudo">Pseudo</label><br>
                <input class="form-control" type="text" id="pseudoInput">
        
                <br><br>
        
                <label for="room ">Room</label><br>
                <input class="form-control" type="text" id="roomInput">
        
                <br>
        
                <div id="resultRoom"></div>
        
                <div class="row justify-content-center">
                    <div class="col-6">
                        <button class="w-100 btn btn-secondary btn-lg" id="joinRoomButton" onclick="joinRoom()">Join room</button>
                    </div>
                    <div class="col-6">
                        <button class="w-100 btn btn-primary btn-lg" id="createRoomButton" onclick="createRoom()">Create new room</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;*/
    }
}