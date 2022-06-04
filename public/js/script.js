//import navigateTo from "./index.js";

$(document).ready(() => {
    $("#roomForm").on('submit', function(e) {
        e.preventDefault();
    });
})


function joinRoom() {
    //document.getElementById("result").innerHTML = "Room create successfuly !";
    value = $("#roomInput").val();
    pseudo = $("#pseudoInput").val();

    socket.emit("join room", value, pseudo);

    $("#roomInput").val("");
    $("#pseudoInput").val("");
}
//RECUP LISTE ROOM ?

function createRoom() {
    //console.log("Create room");
    value = $("#roomInput").val();
    pseudo = $("#pseudoInput").val();

    console.log(value + " : " + pseudo);

    if (value != "") {
        socket.emit("create room", value, pseudo);
    } else {
        $("#resultRoom").html('<div  class="alert alert-warning" role="alert">Input empty !</div>');
    }
    //capturer erreur
}