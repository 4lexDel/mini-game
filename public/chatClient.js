$(document).ready(() => {
    //$("#globalMessageInput").focus();
    //when form is submitted, capture the input value and then send it to server

    $("#globalMessageForm").on('submit', function(e) {
        e.preventDefault();

        if ($("#globalMessageInput").val() != "") {
            socket.emit("send global message", $("#globalMessageInput").val());
            $("#globalMessageInput").val("");
        }
    });

    $("#roomMessageForm").on('submit', function(e) {
        e.preventDefault();

        if ($("#roomMessageInput").val() != "") {
            socket.emit("send room message", $("#roomMessageInput").val());
            $("#roomMessageInput").val("");
        }
    });
});

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

socket.on('players list', function(list) {
    players = list;
    console.log("Player list refresh");

    refreshPlayerList(list);
});

function refreshPlayerList(players) {
    let htmlContent = "<ul>";

    players.forEach(player => {
        htmlContent += "<li>" + player.name + " : " + player.score + "</li>";
    });
    htmlContent += "</ul>";

    $("#playerList").html(htmlContent);
}