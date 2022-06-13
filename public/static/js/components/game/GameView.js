import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game");

        console.log(params);

        if (params["id"] != "" && params["name"] != "") socket.emit("join room", params["id"], params["name"]);
    }

    async getHtml() {
        return `
        <div class="game">
            <div class="gameContent bg-info">
                <br>
                <canvas id="canvasGame" style="background-color: beige;">Your browser doesn't support canvas</canvas>
            </div>

            <div class="gameInfo">
                <br>
                <button class="right w-100 btn btn-success btn-lg" id="#buttonMessage" onclick="chatTrigger('#targetMSGButton')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-text" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
                <br>
                <div id="targetMSGButton" class="info_area">
                    <label for="roomName" id="roomNameID">Room</label><br>
                    <div id="playerList">
                    </div>
                    <br>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="globalChat">
                            <button class="nav-link active" id="globalChat-tab" data-bs-toggle="tab" data-bs-target="#globalChat-tab-pane" type="button" role="tab" aria-controls="globalChat-tab-pane" aria-selected="true">Chat global</button>
                        </li>
                        <li class="nav-item" role="roomChat">
                            <button class="nav-link" id="roomChat-tab" data-bs-toggle="tab" data-bs-target="#roomChat-tab-pane" type="button" role="tab" aria-controls="roomChat-tab-pane" aria-selected="false">Chat room</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="globalChat-tab-pane" role="tabpanel" aria-labelledby="globalChat-tab" tabindex="0">
                            <br>
                            <label for="result">Chat global</label><br>
                            <div class="chatArea" id="resultGlobalMessage"><br></div>
                            <br>
                            <div class="row">
                                <div class="col-8">
                                    <input class="form-control" type="text" id="globalMessageInput">
                                </div>
                                <div class="col-4">
                                    <button class="w-100 btn btn-primary btn-lg" id="sendGlobalMessageButton" onclick="sendGlobalMessage()">Send</button>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="roomChat-tab-pane" role="tabpanel" aria-labelledby="roomChat-tab" tabindex="0">
                            <br>
                            <label for="result">Chat room</label><br>
                            <div class="chatArea" id="resultRoomMessage"><br></div>
                            <br>
                            <div class="row">
                                <div class="col-8">
                                    <input class="form-control" type="text" id="roomMessageInput">
                                </div>
                                <div class="col-4">
                                    <button class="w-100 btn btn-primary btn-lg" id="sendRoomMessageButton" onclick="sendRoomMessage()">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="left w-100 btn btn-danger btn-lg"" onclick="gameDisconnect()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                </button>
            </div>
        </div>
        `;
    }

    initComponent() {
        //console.log("Init component");
        let widthElement = $("#canvasGame").parent().width();
        let heightElement = $("#canvasGame").parent().height();
        heightElement = document.documentElement.clientHeight * 8 / 10;

        $("#canvasGame").width(widthElement).height(heightElement);
    }
}

/**
 * <label for="result">Chat global</label><br>
                    <div class="chatArea" id="resultGlobalMessage"><br></div>
                    <br>
                    <input class="form-control" type="text" id="globalMessageInput">

                    <button class="w-100 btn btn-primary btn-lg" id="sendGlobalMessageButton" onclick="sendGlobalMessage()">Send</button>

                    <br><br>

                    <label for="result">Chat room</label><br>
                    <div class="chatArea" id="resultRoomMessage"><br></div>
                    <br>

                    <input class="form-control" type="text" id="roomMessageInput">

                    <button class="w-100 btn btn-primary btn-lg" id="sendRoomMessageButton" onclick="sendRoomMessage()">Send</button>
 */