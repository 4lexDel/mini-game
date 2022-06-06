import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game");
    }

    async getHtml() {
        return `
            <div class="left_area"></div>
            <div class="right_area">
                <button  class="w-100 btn btn-success btn-lg" id="#buttonMessage" onclick="chatTrigger('#targetMSGButton')">
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
            </div>

        `;

        /*return `
        <div id="playerList">
        </div>
    
        <br><br><br>
    
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="globalChat-tab" data-bs-toggle="tab" data-bs-target="#globalChat-tab-pane" type="button" role="tab" aria-controls="globalChat-tab-pane" aria-selected="true">Chat global</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="roomChat-tab" data-bs-toggle="tab" data-bs-target="#roomChat-tab-pane" type="button" role="tab" aria-controls="roomChat-tab-pane" aria-selected="false">Chat room</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="globalChat-tab-pane" role="tabpanel" aria-labelledby="globalChat-tab" tabindex="0">
                            <form action="" id="globalMessageForm">
                                <br>
                                <label for="result">Chat global</label><br>
                                <div class="chatArea" id="resultGlobalMessage"><br></div>
                                <br>
                                <div class="row">
                                    <div class="col-8">
                                        <input class="form-control" type="text" id="globalMessageInput">
                                    </div>
                                    <div class="col-4">
                                        <button class="w-100 btn btn-primary btn-lg" id="sendGlobalMessageButton">Send</button>
                                    </div>
                                </div>
    
                            </form>
                        </div>
                        <div class="tab-pane fade" id="roomChat-tab-pane" role="tabpanel" aria-labelledby="roomChat-tab" tabindex="0">
                            <form action="" id="roomMessageForm">
                                <br>
                                <label for="result">Chat room</label><br>
                                <div class="chatArea" id="resultRoomMessage"><br></div>
                                <br>
                                <div class="row">
                                    <div class="col-8">
                                        <input class="form-control" type="text" id="roomMessageInput">
                                    </div>
                                    <div class="col-4">
                                        <button class="w-100 btn btn-primary btn-lg" id="sendRoomMessageButton">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;*/
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