import Home from "./views/Home.js";
import Game from "./views/Game.js";

var roomJoin = false;

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"); //Pourquoi un "." ?

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]); //Qu'est ce que \w ?

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const routes = [
    { path: "/", view: Home },
    { path: "/game", view: Game },
    // { path: "/posts/:id", view: PostView },
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
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();

            let url = e.target.href;

            if (url == "/" || roomJoin) navigateTo(url);
        }
    });

    console.log($("button"));

    setTimeout(() => {
        console.log($("button"));
    }, 1);

    router();
});


socket.on("room joined", (state) => {
    if (state) {
        $("#resultRoom").html('<div  class="alert alert-success" role="alert">Room join successfuly !</div>');
        roomJoin = true;
        navigateTo("./game");
    } else {
        console.log("Failed");
        $("#resultRoom").html('<div  class="alert alert-danger" role="alert">Failed !</div>');
    }
});

socket.on("room created", (state) => {
    if (state) {
        $("#result").html('<div  class="alert alert-success" role="alert">Room create successfuly !</div>');
        roomJoin = true;
        navigateTo("./game");
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