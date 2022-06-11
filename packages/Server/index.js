const TeamHandler = require("../TeamHandler/index.js")
const AccountHandler = require("../AccountHandler/index.js")

setTimeout(() => {
    TeamHandler.loadAllTeams();
}, 1000);

setInterval(() => {
    let currentDate = new Date();
    let current_hour = currentDate.getHours();
    let current_minute = currentDate.getMinutes();
    mp.world.time.set(parseInt(current_hour + 1), parseInt(current_minute), 0);

    mp.players.forEach(element => {
        if (element.getVariable("isLoggedIn"))
        {
            AccountHandler.updatePlayerAccount(element);
        }
    });

}, 20000);

mp.events.add("kickPlayer", (player) => {
    player.kick();
});