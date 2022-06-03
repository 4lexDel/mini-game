import Home from "./views/Home.js";
import Game from "./views/Game.js";


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

const router = async() => {
    const routes = [
        { path: "/", view: Home },
        { path: "/game", view: Game },
        // { path: "/posts/:id", view: PostView },
    ];

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
            navigateTo(e.target.href);
        }
    });

    router();
});

/*document.body.addEventListener("click", e => {
    console.log("Test from a module");
    console.log(e);
})*/

$(document).ready(function() {
    console.log("zegrhzfaefzsnklfn");

    console.log(document.body);

    let test = document.getElementById("joinRoomButton");

    console.log(test);

    test.addEventListener("click", () => {
        console.log("Join button");
    })
})