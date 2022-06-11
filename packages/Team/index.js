const Notification = require ("../Notification/index.js");
const gangwarutil = require("../Utils/index.js");
const TeamHanler = require("../TeamHandler/index.js")
const WeaponLevel = require("../Weapon/index.js")
const AccountHandler = require("../AccountHandler/index.js")

const KriegHandler = require("../Krieg/index.js");

module.exports = { openTeam }

function openTeam(player)
{

    let t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0;

    mp.players.forEach(element => {
        if (element.getVariable("isLoggedIn"))
        {
            if (element.getVariable("Fraktion") == "Ballas")
            {
                t1++;
            } 
            else if (element.getVariable("Fraktion") == "Grove")
            {
                t2++;
            } 
            else if (element.getVariable("Fraktion") == "Bloods")
            {
                t3++;
            } 
            else if (element.getVariable("Fraktion") == "Vagos")
            {
                t4++;
            } 
            else if (element.getVariable("Fraktion") == "Crips")
            {
                t5++;
            } 
            else if (element.getVariable("Fraktion") == "LCN")
            {
                t6++;
            } 
            else if (element.getVariable("Fraktion") == "Yakuza")
            {
                t7++;
            } 
            else if (element.getVariable("Fraktion") == "Triaden")
            {
                t8++;
            } 
            else if (element.getVariable("Fraktion") == "MG13")
            {
                t9++;
            } 
            else if (element.getVariable("Fraktion") == "LSPD")
            {
                t10++;
            } 
            else if (element.getVariable("Fraktion") == "187")
            {
                t11++;
            } 
        }
    });

    player.call("GGW:OpenUI:Teamauswahl", [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11]);
    player.call("GGW:ExecuteUI:Teamauswahl:ActivateTeam", [`${player.getVariable("PrivatTeam")}`]);
}

mp.events.addCommand("team", (player) => {
    if (player.getVariable("isFFA")) return Notification.sendPlayerNotification(player, "FFA", "Du bist in einer FFA!");
    openTeam(player);
    player.call("GGW:CloseUI::HUD")
    player.dimension = gangwarutil.getRandomInt(30, 80);
    player.spawn(new mp.Vector3(-722.7653198242188, -1428.4677734375, 5.000524520874023))
    player.heading = 137.23526000976562;
});

mp.events.add("GGW:ServerEvent:TryJoinTeam", (player, frakname) => {
    if (frakname == KriegHandler.kriegteam1) return player.call("GGW:ExecuteUI:Teamauswahl:Error", ["Dieses Team befindet sich dezeit im Krieg!"]);
    if (frakname == KriegHandler.kriegteam2) return player.call("GGW:ExecuteUI:Teamauswahl:Error", ["Dieses Team befindet sich dezeit im Krieg!"]);
    player.setVariable("Fraktion", frakname);
    player.call("GGW:CloseUI:Teamauswahl")
    TeamHanler.openOutfits(player);
    player.playAnimation("mini@strip_club@idles@bouncer@idle_a", "idle_a", 50, 15)
});

mp.events.add("GGW:ServerEvent:TryJoinPrivatTeam", (player, frakname) => {
    if (player.getVariable("PrivatTeam") == frakname)
    {
        if (frakname == KriegHandler.kriegteam1) return player.call("GGW:ExecuteUI:Teamauswahl:Error", ["Dieses Team befindet sich dezeit im Krieg!"]);
        if (frakname == KriegHandler.kriegteam2) return player.call("GGW:ExecuteUI:Teamauswahl:Error", ["Dieses Team befindet sich dezeit im Krieg!"]);
        player.setVariable("Fraktion", frakname);
        player.call("GGW:CloseUI:Teamauswahl")
        TeamHanler.openOutfits(player);
        player.playAnimation("mini@strip_club@idles@bouncer@idle_a", "idle_a", 50, 15)
    }
});

mp.events.add("GGW:ServerEvent:TryTestPlayOutfit", (player, outfitnumbers) => {
    TeamHanler.loadTeamClothes(player, outfitnumbers);
});

mp.events.add("GGW:ServerEvent:TryPlayOutfit", (player, outfitnumbers) => {
    TeamHanler.loadTeamPosition(player);
    player.call("GGW:CloseUI:Outfits")
    player.dimension = 0;
    WeaponLevel.setLevelWeapon(player, player.getVariable("Level"))
    player.stopAnimation();
});

mp.events.addCommand("invite", (player, clientname) => {
    if (player.getVariable("isFFA")) return Notification.sendPlayerNotification(player, "FFA", "Du bist in einer FFA!");
    if (player.getVariable("PrivatTeamIsLeader") == 0) return Notification.sendPlayerNotification(player, "Server", "Du bist kein Leader!");
    if (clientname == null) return;
    let count = 0;
    mp.players.forEachInRange(player.position, 10,
		(_player) => {
		if (_player.name == clientname)
        {
            count++;
            _player.call("GGW:OpenUI:FraktionInvite", [`${player.getVariable("PrivatTeam")}`]);
        }
	});
    if (count == 0)
    {
        Notification.sendPlayerNotification(player, "Invite", "Dieser Spieler ist nicht in deiner nähe!");
    }
});

mp.events.addCommand("uninvite", (player, clientname) => {
    if (player.getVariable("PrivatTeamIsLeader") == 0) return Notification.sendPlayerNotification(player, "Server", "Du bist kein Leader!");
    if (clientname == null) return;
    mp.players.forEach(_currentPlayer => {
        if(_currentPlayer.name == clientname)
        {
            Notification.sendPlayerNotification(player, `${player.getVariable("PrivatTeam")}`, `Du hast ${clientname} aus der Fraktion geworfen!`);
            Notification.sendPlayerNotification(_currentPlayer, `${player.getVariable("PrivatTeam")}`, `Du wurdest von ${player.name} aus der Fraktion geworfen!`);
            _currentPlayer.setVariable("PrivatTeam", null);
            _currentPlayer.setVariable("PrivatTeamIsLeader", 0);
            AccountHandler.saveTeamRank(_currentPlayer);
        }
    });
});

mp.events.add("GGW:ServerEvent:FraktionInvite2", (player, frakname) => {
    Notification.sendPlayerNotification(player, `${frakname}`, `Du hast die Anfrage abgelehnt!`);
    mp.players.forEach(element => {
        if (element.getVariable("PrivatTeamIsLeader") == 1)
        {
            if (element.getVariable("PrivatTeam") == frakname)
            {
                Notification.sendPlayerNotification(element, `${frakname}`, `Der Spieler ${player.name} hat deine Anfrage abgelehnt!`);
            }
        }
    });
});

mp.events.add("GGW:ServerEvent:TryJoinFraktionFromInvite", (player, frakname) => {
    Notification.sendPlayerNotification(player, `${frakname}`, `Du hast die Anfrage angenommen!`);
    mp.players.forEach(element => {
        if (element.getVariable("PrivatTeam") == frakname)
        {
            Notification.sendPlayerNotification(element, `${frakname}`, `Der Spieler ${player.name} ist beigetreten!`)
            player.setVariable("PrivatTeam", frakname);
            player.setVariable("PrivatTeamIsLeader", 0);
            AccountHandler.saveTeamRank(player);
            player.call("GGW:CloseUI:FraktionInvite")
        }
    });
});