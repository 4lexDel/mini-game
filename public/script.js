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
}
//RECUP LISTE ROOM ?

socket.on("room joined", (state) => {
    if (state) {
        $("#resultRoom").html('<div  class="alert alert-success" role="alert">Room join successfuly !</div>');
        //loadGame($("#homeContent"));
        //document.location.href = "./secondPage.html";
        refreshSessionInformations(); //DEMANDE D'INFOS
    } else {
        console.log("Failed");
        $("#resultRoom").html('<div  class="alert alert-danger" role="alert">Failed !</div>');
    }
});

function createRoom() {
    //console.log("Create room");
    value = $("#roomInput").val();
    pseudo = $("#pseudoInput").val();

    if (value != "") {
        socket.emit("create room", value, pseudo);
    } else {
        $("#resultRoom").html('<div  class="alert alert-warning" role="alert">Input empty !</div>');
    }
    //capturer erreur
}

socket.on("room created", (state) => {
    if (state) {
        $("#result").html('<div  class="alert alert-success" role="alert">Room create successfuly !</div>');
        //document.location.href = "./secondPage.html";
        refreshSessionInformations();
    } else {
        $("#result").html('<div  class="alert alert-danger" role="alert">Failed !</div>');
    }
});