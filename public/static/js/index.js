import Home from "./components/home/HomeView.js";
import Game from "./components/game/GameView.js"; //View

import * as roomAction from "./components/home/roomAction.js";
import * as toolBox from "./toolBox.js"; //Appel de script pour divers fonctionnalités
import * as chatClient from "./chatClient.js";
import * as getInfo from "./getInfo.js";
import * as gameTools from "./components/game/gameTools.js";

var roomJoin = false;

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.*)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    //console.log(keys);

    return Object.fromEntries(keys.map((key, i) => {
        console.log([key, values[i]]);
        return [key, values[i]];
    }));
};

export const navigateTo = url => {
    //if (url != "/" && !roomJoin) url = "/";
    history.pushState(null, null, url);
    router();
};

const routes = [
    { path: "/", view: Home },
    { path: "/game/:id/:name", view: Game },
];

const router = async() => {
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        console.log("Pas trouvé sorry");
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    view.initComponent();
};

//navigateTo("/"); //------------------------------------------------Home par défaut

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();

            navigateTo(e.target.href);
        }
    });

    router();
});


socket.on("room joined", (state) => {
    if (state) {
        $("#resultRoom").html('<div  class="alert alert-success" role="alert">Room join successfuly !</div>');
        roomJoin = true;
        //navigateTo("./game/");
    } else {
        console.log("Failed");
        $("#resultRoom").html('<div  class="alert alert-danger" role="alert">Failed !</div>');
        navigateTo("/");
    }
});

socket.on("room created", (state) => {
    if (state) {
        $("#result").html('<div  class="alert alert-success" role="alert">Room create successfuly !</div>');
        roomJoin = true;
        navigateTo("./game//");
    } else {
        $("#result").html('<div  class="alert alert-danger" role="alert">Failed !</div>');
    }
});

/*document.body.addEventListener("click", e => {
    console.log("Test from a module");
    console.log(e);
})*/

// $(document).ready(function() {
//     console.log($(document));
//     $("#joinRoomButton").click(function() {
//         console.log("Join button");
//     })
// })