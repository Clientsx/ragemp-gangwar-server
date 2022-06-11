const Notification = require("../Notification/index.js");
const TeamHandler = require("../TeamHandler/index.js")
const WeaponHandler = require("../Weapon/index.js")
const gangwarutil = require("../Utils/index.js");

function openFFA(player)
{
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;

    mp.players.forEach(element => {
        if (element.getVariable("isFFA"))
        {
            if (element.getVariable("FFA") == 1)
            {
                p1++;
            } 
            else if (element.getVariable("FFA") == 2)
            {
                p2++;
            }
            else if (element.getVariable("FFA") == 3)
            {
                p3++;
            }
        }
    });

    player.call("GGW:OpenUI:FFA", [p1, p2, p3])
}

mp.events.addCommand("ffa", (player) => {
    if (player.getVariable("isFFA")) return Notification.sendPlayerNotification(player, "FFA", "Du bist bereits in einer FFA drinne!");
    player.dimension = gangwarutil.getRandomInt(30, 80);
    player.spawn(new mp.Vector3(-1494.433349609375, -1468.6148681640625, 2.00234317779541))
    openFFA(player);
});

mp.events.addCommand("quitffa", (player) => {
    if (!player.getVariable("isFFA")) return Notification.sendPlayerNotification(player, "FFA", "Du bist in keiner FFA drinne!");
    player.removeAllWeapons();
    player.dimension = 0;
    player.setVariable("isFFA", false);
    player.setVariable("FFA", null);
    TeamHandler.loadTeamPosition(player);
    WeaponHandler.setLevelWeapon(player, player.getVariable("Level"));
});

mp.events.add("GGW:ServerEvent:ClosedFFA", (player) => {
    player.dimension = 0;
    TeamHandler.loadTeamPosition(player);
});

mp.events.add("GGW:ServerEvent:TryJoinFFA", (player, selectedFFA) => {
    selectedFFA = parseInt(selectedFFA);
    player.removeAllWeapons();
    switch (selectedFFA) {
        case 1:
            player.dimension = 31;
            player.setVariable("isFFA", true);
            player.setVariable("FFA", 1);
        break;
        case 2:
            player.dimension = 32;
            player.setVariable("isFFA", true);
            player.setVariable("FFA", 2);
        break;
        case 3:
            player.dimension = 33;
            player.setVariable("isFFA", true);
            player.setVariable("FFA", 3);
        break;
        default:
            break;
    }
    player.call("GGW:CloseUI:FFA2")
    player.call("GGW:ClearEvals")
    player.call("GGW:CutomEvalTimer", [500, "GGW:RespawnOnFFA"])
    player.giveWeapon([0x5EF9FEC4, 0xC1B3C3D1, 0xBD248B55, 0x2BE6766B, 0x1D073A89, 0x61012683, 0xBFEFFF6D, 0xAF113F99, 0x83BF0278, 0x7F229F94, 0x624FE830, 0x9D1F17E6], 9999);
});