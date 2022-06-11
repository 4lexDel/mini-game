import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");

        console.log("Home");
    }

    async getHtml() {
        return `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-sm-6">
                    <h1>Welcome at Home !</h1>

                    <br>

                    <label for="pseudo">Pseudo</label><br>
                    <input class="form-control" type="text" id="pseudoInput">
                    
                    <br><hr>
                    
                    <label for="room ">Room</label><br>
                    <input class="form-control" type="text" id="roomInput">
                    
                    <br>

                    <input class="form-check-input" type="checkbox" id="roomAccessRadio">
                    <label for="private ">Private</label>

                    <br><br>
                    
                    <div id="resultRoom"></div>
                    
                    <div class="row justify-content-center">
                        <div class="col-6">
                        <button class="w-100 btn btn-secondary btn-lg" id="joinRoomButton" onclick="joinRoom()">Join</button>
                        </div>
                        <div class="col-6">
                        <button class="w-100 btn btn-primary btn-lg" id="createRoomButton" onclick="createRoom()">Create</button>
                        </div>
                    </div>

                    <br><hr><br>

                    <label for="room ">Public room</label><br>
                    <div id="roomList"></div>
                </div>
            </div>  
        </div>    
        `;

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
                        <button class="w-100 btn btn-secondary btn-lg" id="joinRoomButton" onclick="joinRoom()">Join</button>
                    </div>
                    <div class="col-6">
                        <button class="w-100 btn btn-primary btn-lg" id="createRoomButton" onclick="createRoom()">Create</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;*/
    }
}