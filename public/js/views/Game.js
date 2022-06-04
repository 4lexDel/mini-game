import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game");
    }

    async getHtml() {
        return `
        <form action="" id="globalMessageForm">
            <br>
            <label for="result">Chat global</label><br>
            <div class="chatArea" id="resultGlobalMessage"><br></div>
            <br>
            <input type="text" id="globalMessageInput">

            <button id="sendGlobalMessageButton">Send</button>
        </form>
        <form action="" id="roomMessageForm">
            <br>
            <label for="result">Chat room</label><br>
            <div class="chatArea" id="resultRoomMessage"><br></div>
            <br>

            <input type="text" id="roomMessageInput">

            <button id="sendRoomMessageButton">Send</button>
        </form>
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