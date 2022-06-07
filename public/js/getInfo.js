socket.on('players list', function(list) {
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