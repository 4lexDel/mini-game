import { navigateTo } from "../../index.js";

export function joinRoom() {
    //document.getElementById("result").innerHTML = "Room create successfuly !";
    let value = $("#roomInput").val();
    let pseudo = $("#pseudoInput").val();

    navigateTo("/game/" + value + "/" + pseudo);

    //socket.emit("join room", value, pseudo);

    $("#roomInput").val("");
    $("#pseudoInput").val("");
}
//RECUP LISTE ROOM ?

export function createRoom() {
    //console.log("Create room");
    let value = $("#roomInput").val();
    //value = document.getElementById("roomInput");
    let pseudo = $("#pseudoInput").val();

    let access = $("#roomAccessRadio").is(':checked');
    let playerNumber = $("#playerLimitNumber").val();

    console.log(value + " : " + pseudo + " (" + access + ") => " + playerNumber);
    //console.log($("#roomAccessRadio"));

    if (value != "") {
        socket.emit("create room", value, pseudo, access, playerNumber);
    } else {
        $("#resultRoom").html('<div  class="alert alert-warning" role="alert">Input empty !</div>');
    }
    //capturer erreur
}

socket.on('rooms list', function(list) {
    console.log("Rooms list refresh");

    refreshRoomList(list);
});

function refreshRoomList(rooms) {
    let htmlContent = "<ul>";

    rooms.forEach(room => {
        htmlContent += "<li><a href=\"./game/" + room.id + "/guest\" data-link>" + room.id + " : " + room.players.length + "/" + room.playerLimit + " joueur(s)</li>";
    });
    htmlContent += "</ul>";

    $("#roomList").html(htmlContent);
}

window.createRoom = createRoom;
window.joinRoom = joinRoom;