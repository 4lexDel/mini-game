const socket = io();

function refreshSessionInformations() {
    // Get saved data from sessionStorage
    let session_id = sessionStorage.getItem('sessionId');
    let pseudo = sessionStorage.getItem('name');
    let room_id = sessionStorage.getItem('roomID');

    console.log({ sessionId: session_id, name: pseudo, roomID: room_id })

    console.log("Session emit");
    socket.emit('start-session', { sessionId: session_id, name: pseudo, roomID: room_id });
}

socket.on("set-session-acknowledgement", function(data) {
    sessionStorage.setItem('sessionId', data.sessionId);
    sessionStorage.setItem('name', data.name);
    sessionStorage.setItem('roomID', data.roomID);

    console.log(data);
    console.log("Session receive");
})

refreshSessionInformations(); //On recup les infos directement apres le chargement de la page