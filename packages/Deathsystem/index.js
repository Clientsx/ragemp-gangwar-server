const Notification = require("../Notification/index.js");
const gangwarutil = require("../Utils/index.js");
const Team = require("../Team/index.js")

let grovespawnPoints = require('./json/teamspawn.json').Grove;
let bloodsspawnPoints = require('./json/teamspawn.json').Bloods;
let ballasspawnPoints = require('./json/teamspawn.json').Ballas;
let vagosspawnPoints = require('./json/teamspawn.json').Vagos;
let cripsspawnPoints = require('./json/teamspawn.json').Crips;
let lcnspawnPoints = require('./json/teamspawn.json').LCN;
let yakuzaspawnPoints = require('./json/teamspawn.json').Yakuza;
let triadenspawnPoints = require('./json/teamspawn.json').Triaden;

let ffa1spawnPoint = require("./json/ffa1.json").FFA1;
let ffa2spawnPoint = require("./json/ffa2.json").FFA2;
let ffa3spawnPoint = require("./json/ffa3.json").FFA3;

const KriegHandler = require("../Krieg/index.js");

function spawnonTeamSpawn(player)
{
    switch (player.getVariable("Fraktion")) {
        case "Grove":
            let rd = Math.floor(Math.random() * grovespawnPoints.length);
            player.spawn(new mp.Vector3(grovespawnPoints[rd].x, grovespawnPoints[rd].y, grovespawnPoints[rd].z));
            player.heading = grovespawnPoints[rd].r;
            player.data.walkingStyle = "move_m@shadyped@a";
        break;
        case "Bloods":
            let rd1 = Math.floor(Math.random() * bloodsspawnPoints.length);
            player.spawn(new mp.Vector3(bloodsspawnPoints[rd1].x, bloodsspawnPoints[rd1].y, bloodsspawnPoints[rd1].z));
            player.heading = bloodsspawnPoints[rd1].r;
            player.data.walkingStyle = "move_m@shadyped@a";
        break;
        case "Ballas":
            let rd2 = Math.floor(Math.random() * ballasspawnPoints.length);
            player.spawn(new mp.Vector3(ballasspawnPoints[rd2].x, ballasspawnPoints[rd2].y, ballasspawnPoints[rd2].z));
            player.heading = ballasspawnPoints[rd2].r;
            player.data.walkingStyle = "move_m@shadyped@a";
        break;
        case "Vagos":
            let rd3 = Math.floor(Math.random() * vagosspawnPoints.length);
            player.spawn(new mp.Vector3(vagosspawnPoints[rd3].x, vagosspawnPoints[rd3].y, vagosspawnPoints[rd3].z));
            player.heading = vagosspawnPoints[rd3].r;
            player.data.walkingStyle = "move_m@shadyped@a";
        break;
        case "Crips":
            let rd4 = Math.floor(Math.random() * cripsspawnPoints.length);
            player.spawn(new mp.Vector3(cripsspawnPoints[rd4].x, cripsspawnPoints[rd4].y, cripsspawnPoints[rd4].z));
            player.heading = cripsspawnPoints[rd4].r;
            player.data.walkingStyle = "move_m@shadyped@a";
        break;
        case "LCN":
            let rd5 = Math.floor(Math.random() * lcnspawnPoints.length);
            player.spawn(new mp.Vector3(lcnspawnPoints[rd5].x, lcnspawnPoints[rd5].y, lcnspawnPoints[rd5].z));
            player.heading = lcnspawnPoints[rd5].r;
            player.data.walkingStyle = null;
        break;
        case "Yakuza":
            let rd6 = Math.floor(Math.random() * yakuzaspawnPoints.length);
            player.spawn(new mp.Vector3(yakuzaspawnPoints[rd6].x, yakuzaspawnPoints[rd6].y, yakuzaspawnPoints[rd6].z));
            player.heading = yakuzaspawnPoints[rd6].r;
            player.data.walkingStyle = null;
        break;
        case "Triaden":
            let rd7 = Math.floor(Math.random() * triadenspawnPoints.length);
            player.spawn(new mp.Vector3(triadenspawnPoints[rd7].x, triadenspawnPoints[rd7].y, triadenspawnPoints[rd7].z));
            player.heading = triadenspawnPoints[rd7].r;
            player.data.walkingStyle = null;
        break;
    
        default:
            let oldspawndata = player.data.teamspawn;
            let newspawndata = oldspawndata.split("%");
            player.spawn(new mp.Vector3(parseFloat(newspawndata[0]), parseFloat(newspawndata[1]), parseFloat(newspawndata[2])));
            player.heading = parseFloat(newspawndata[3]);
            player.data.walkingStyle = null;
        break;
    }
    player.armour = 100;
    player.setVariable("isDeath", false);
}

mp.events.add("playerDeath", (player, reason, killer) => {

    killer = player.getVariable("lasthitter")
    player.setVariable("lasthitter", null)

    loadPlayerDeath(player);
 
    if (killer) {
        if (killer.getVariable("isFFA"))
        {
            player.notify(`Du wurdest von ${killer.name} getötet!`);
            killer.call("GGW:showKillerScreen", [`${player.name}`])
            killer.health = 100;
            killer.armour = 100;
            killer.setVariable("Kills", parseInt(killer.getVariable("Kills")) + 1);
            killer.setVariable("Xp", parseInt(killer.getVariable("Xp")) + 25);
            killer.setVariable("Killstreak", parseInt(killer.getVariable("Killstreak")) + 1);
            let rd = gangwarutil.getRandomInt(15, 99);
            killer.setVariable("Money", parseInt(killer.getVariable("Money")) + parseInt(rd));
            Notification.sendPlayerNotification(killer, "Server", `Du hast für den Kill ${rd}$ erhalten!`)
            killer.call("GGW:updateHUD", [`${killer.getVariable("Kills")}`, `${killer.getVariable("Deaths")}`, `${killer.getVariable("Xp")}`, `${killer.getVariable("MaxXp")}`, `${killer.getVariable("Level")}`]);
            if (killer.getVariable("Xp") >= killer.getVariable("MaxXp"))
            {
                //killer.outpuChatBox(`[!{0, 160, 0}LEVEL UP!{255, 255, 255}] Du bist ein Level aufgestiegen!`)
                killer.setVariable("Xp", parseInt(killer.getVariable("Xp")) - parseInt(killer.getVariable("MaxXp")));
                killer.setVariable("Level", parseInt(killer.getVariable("Level")) + 1);
                killer.setVariable("MaxXp", parseInt(killer.getVariable("MaxXp")) + 50);
                killer.call("GGW:updateHUD", [`${killer.getVariable("Kills")}`, `${killer.getVariable("Deaths")}`, `${killer.getVariable("Xp")}`, `${killer.getVariable("MaxXp")}`, `${killer.getVariable("Level")}`]);
            }

            switch (killer.getVariable("Killstreak")) {
                case 5:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}5er!{255, 255, 255} Killstreak!`);
                break;
                case 10:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}10er!{255, 255, 255} Killstreak!`);
                break;
                case 15:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}15er!{255, 255, 255} Killstreak!`);
                break;
                case 25:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}25er!{255, 255, 255} Killstreak!`);
                break;
                case 35:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}35er!{255, 255, 255} Killstreak!`);
                break;
                case 45:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}45er!{255, 255, 255} Killstreak!`);
                break;
                case 50:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}50er!{255, 255, 255} Killstreak!`);
                break;
                case 100:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}100er!{255, 255, 255} Killstreak!`);
                break;
            }
        } 
        else if (killer.getVariable("isKrieg"))
        {
             switch (killer.getVariable("Fraktion")) {
                 case KriegHandler.kriegteam1:
                     KriegHandler.kriegteam1punkte += 3;
                     KriegHandler.updatePunkte();
                 break;

                 case KriegHandler.kriegteam2:
                     KriegHandler.kriegteam2punkte += 3;
                     KriegHandler.updatePunkte();
                 break;
            
                default:
                 break;
             }
        } else {
            player.notify(`Du wurdest von ${killer.name} getötet!`);
            killer.call("GGW:showKillerScreen", [`${player.name}`])
            killer.health = 100;
            killer.armour = 100;
            killer.setVariable("Kills", parseInt(killer.getVariable("Kills")) + 1);
            killer.setVariable("Xp", parseInt(killer.getVariable("Xp")) + 25);
            let rd2 = gangwarutil.getRandomInt(15, 99);
            killer.setVariable("Money", parseInt(killer.getVariable("Money")) + parseInt(rd2));
            Notification.sendPlayerNotification(killer, "Server", `Du hast für den Kill ${rd2}$ erhalten!`)
            killer.setVariable("Killstreak", parseInt(killer.getVariable("Killstreak")) + 1);
            killer.call("GGW:updateHUD", [`${killer.getVariable("Kills")}`, `${killer.getVariable("Deaths")}`, `${killer.getVariable("Xp")}`, `${killer.getVariable("MaxXp")}`, `${killer.getVariable("Level")}`]);
            if (killer.getVariable("Xp") >= killer.getVariable("MaxXp"))
            {
                //killer.outpuChatBox(`[!{0, 160, 0}LEVEL UP!{255, 255, 255}] Du bist ein Level aufgestiegen!`)
                killer.setVariable("Xp", parseInt(killer.getVariable("Xp")) - parseInt(killer.getVariable("MaxXp")));
                killer.setVariable("Level", parseInt(killer.getVariable("Level")) + 1);
                killer.setVariable("MaxXp", parseInt(killer.getVariable("MaxXp")) + 50);
                killer.call("GGW:updateHUD", [`${killer.getVariable("Kills")}`, `${killer.getVariable("Deaths")}`, `${killer.getVariable("Xp")}`, `${killer.getVariable("MaxXp")}`, `${killer.getVariable("Level")}`]);
            }

            switch (killer.getVariable("Killstreak")) {
                case 5:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}5er!{255, 255, 255} Killstreak!`);
                break;
                case 10:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}10er!{255, 255, 255} Killstreak!`);
                break;
                case 15:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}15er!{255, 255, 255} Killstreak!`);
                break;
                case 25:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}25er!{255, 255, 255} Killstreak!`);
                break;
                case 35:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}35er!{255, 255, 255} Killstreak!`);
                break;
                case 45:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}45er!{255, 255, 255} Killstreak!`);
                break;
                case 50:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}50er!{255, 255, 255} Killstreak!`);
                break;
                case 100:
                    mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}100er!{255, 255, 255} Killstreak!`);
                break;
            }
        }
    }
});

function loadPlayerDeath(player)
{
    player.setVariable("Killstreak", 0);
    player.setVariable("isDeath", true);
    player.setVariable("Deaths", parseInt(player.getVariable("Deaths")) + 1);
    player.call("GGW:updateHUD", [`${player.getVariable("Kills")}`, `${player.getVariable("Deaths")}`, `${player.getVariable("Xp")}`, `${player.getVariable("MaxXp")}`, `${player.getVariable("Level")}`]);

    if (player.getVariable("isFFA"))
    {
        player.call("GGW:ClearEvals")
        player.call("GGW:CutomEvalTimer", [1000, "GGW:RespawnOnFFA"])
    } else if (player.getVariable("is1vs1"))
    {
        player.call("GGW:ClearEvals")

        
    } else if (player.getVariable("isKrieg"))
    {
        player.call("GGW:ClearEvals")
        player.call("GGW:CutomEvalTimer", [30000, "GGW:RespawnOnNormal"])
    } else {
        player.call("GGW:ClearEvals")
        player.call("GGW:CutomEvalTimer", [3000, "GGW:RespawnOnNormal"])
    }
}

mp.events.add("GGW:RespawnOnFFA", (player) => {
    switch (player.getVariable("FFA")) {
        case 1:
            let rd = Math.floor(Math.random() * ffa1spawnPoint.length);
            player.spawn(new mp.Vector3(ffa1spawnPoint[rd].x, ffa1spawnPoint[rd].y, ffa1spawnPoint[rd].z));
            player.heading = ffa1spawnPoint[rd].r;
            player.armour = 100;
        break;
        case 2:
            let rd2 = Math.floor(Math.random() * ffa2spawnPoint.length);
            player.spawn(new mp.Vector3(ffa2spawnPoint[rd2].x, ffa2spawnPoint[rd2].y, ffa2spawnPoint[rd2].z));
            player.heading = ffa2spawnPoint[rd2].r;
            player.armour = 100;
        break;
        case 3:
            let rd3 = Math.floor(Math.random() * ffa3spawnPoint.length);
            player.spawn(new mp.Vector3(ffa3spawnPoint[rd3].x, ffa3spawnPoint[rd3].y, ffa3spawnPoint[rd3].z));
            player.heading = ffa3spawnPoint[rd3].r;
            player.armour = 100;
        break;
    }
    player.setVariable("isDeath", false);
});

mp.events.add("GGW:RespawnOnNormal", (player) => {
    spawnonTeamSpawn(player);
});