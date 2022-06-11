import { navigateTo } from "./index.js";

export function chatTrigger(triggerID) {
    console.log(triggerID + " CHANGE !");
    console.log($(triggerID));

    $(triggerID).toggle(500);
}

export function gameDisconnect() {
    console.log("ToolBox : leave");
    socket.emit('leave room'); //Déco auto !
    navigateTo("/");
}

window.chatTrigger = chatTrigger;
window.gameDisconnect = gameDisconnect;