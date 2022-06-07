export function chatTrigger(triggerID) {
    console.log(triggerID + " CHANGE !");
    console.log($(triggerID));

    $(triggerID).toggle(500);
}

window.chatTrigger = chatTrigger;