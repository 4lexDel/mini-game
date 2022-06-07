export function sendGlobalMessage() {
    if ($("#globalMessageInput").val() != "") {
        socket.emit("send global message", $("#globalMessageInput").val());
        $("#globalMessageInput").val("");
    }
}

window.sendGlobalMessage = sendGlobalMessage;

export function sendRoomMessage() {
    if ($("#roomMessageInput").val() != "") {
        socket.emit("send room message", $("#roomMessageInput").val());
        $("#roomMessageInput").val("");
    }
}

window.sendRoomMessage = sendRoomMessage;

socket.on("global message", (player, data) => {
    displayMessage($(resultGlobalMessage), data, player);
});

socket.on("room message", (player, data) => {
    displayMessage($(resultRoomMessage), data, player);
});

function displayMessage(element, message, player) {
    let author = "otherMessage";
    if (player.id == socket.id) author = "myMessage";

    let messageHTML = '<div class="message ' + author + '">' + player.name + ' : ' + message + '</div>';

    console.log(messageHTML);

    element.append(messageHTML);
}