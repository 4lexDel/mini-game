export function joinRoom() {
    //document.getElementById("result").innerHTML = "Room create successfuly !";
    let value = $("#roomInput").val();
    let pseudo = $("#pseudoInput").val();

    socket.emit("join room", value, pseudo);

    $("#roomInput").val("");
    $("#pseudoInput").val("");
}
//RECUP LISTE ROOM ?

export function createRoom() {
    //console.log("Create room");
    let value = $("#roomInput").val();
    //value = document.getElementById("roomInput");
    let pseudo = $("#pseudoInput").val();

    console.log(value + " : " + pseudo);

    if (value != "") {
        socket.emit("create room", value, pseudo);
    } else {
        $("#resultRoom").html('<div  class="alert alert-warning" role="alert">Input empty !</div>');
    }
    //capturer erreur
}

window.createRoom = createRoom;
window.joinRoom = joinRoom;