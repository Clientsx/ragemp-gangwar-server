const Notification = require("../Notification/index.js")
const BanHandler = require("../BanHandler/index.js");
const AccountHandler = require("../AccountHandler/index.js")

mp.events.addCommand("aduty", (player) => {
    if (player.getVariable("Admin") > 0)
    {
        if (player.getVariable("aduty"))
        {
            player.setVariable("aduty", false);
            Notification.sendPlayerNotification(player, "ADMIN", "Du bist nun nichtmehr im Admin-Dienst!")
        } else {
            player.setVariable("aduty", true);
            Notification.sendPlayerNotification(player, "ADMIN", "Du bist nun im Admin-Dienst!")
        }
        player.call("updateHUDAdminStatus", [`${player.getVariable("aduty")}`])
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("v", (player) => {
    if (player.getVariable("Admin") >= 1)
    {
        if (player.alpha > 225)
        {
            player.alpha = 0;
            Notification.sendPlayerNotification(player, "ADMIN", "Du bist nun Unsichtbar!")
        } else {
            player.alpha = 255;
            Notification.sendPlayerNotification(player, "ADMIN", "Du bist nun Sichtbar!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("pos", (player) => {
    if (player.getVariable("Admin") >= 7)
    {
        console.log(`${player.position.x}, ${player.position.y}, ${player.position.z}`)
    }
});

mp.events.addCommand("rot", (player) => {
    if (player.getVariable("Admin") >= 7)
    {
        console.log(`${player.heading}`)
    }
});

mp.events.addCommand("kick", (player, fullText, clientname, reason) => {
    if (player.getVariable("Admin") >= 2)
    {
        if (clientname == null || reason == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                Notification.sendPlayerNotification(player, "ADMIN", "Du hast den Spieler gekickt!")
                mp.players.broadcast(`[!{255, 0, 0}KICK!{255, 255, 255}] ` + clientname + " wurde von " + player.name + " gekickt! Grund: " + reason);
                currentPlayername++;
                _currentPlayer.kick();
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            Notification.sendPlayerNotification(player, "ADMIN", "Der Spieler wurde nicht gefunden!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("ban", (player, fullText, clientname, reason) => {
    if (player.getVariable("Admin") >= 2)
    {
        if (clientname == null || reason == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                Notification.sendPlayerNotification(player, "ADMIN", "Du hast den Spieler gebannt!")
                mp.players.broadcast(`[!{255, 0, 0}BAN!{255, 255, 255}] ` + clientname + " wurde von " + player.name + " gebannt! Grund: " + reason);
                currentPlayername++;
                BanHandler.PlayerBann(reason, clientname);
                _currentPlayer.kick();
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            Notification.sendPlayerNotification(player, "ADMIN", "Der Spieler wurde nicht gefunden!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("unban", (player, banname) => {
    if (player.getVariable("Admin") >= 5)
    {
        if (banname == null) return;
        Notification.sendPlayerNotification(player, "ADMIN", "Du hast den Spieler entbannt!")
        BanHandler.PlayerUnbann(banname);
    }
});

mp.events.addCommand("tpto", (player, clientname) => {
    if (player.getVariable("Admin") >= 1)
    {
        if (clientname == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                Notification.sendPlayerNotification(player, "ADMIN", `Du hast dich zu dem Spieler ${clientname} teleportiert!`)
                player.position = new mp.Vector3(_currentPlayer.position);
                currentPlayername++;
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            Notification.sendPlayerNotification(player, "ADMIN", "Der Spieler wurde nicht gefunden!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("tphere", (player, clientname) => {
    if (player.getVariable("Admin") >= 1)
    {
        if (clientname == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                Notification.sendPlayerNotification(player, "ADMIN", `Du hast den Spieler ${clientname} zu dir teleportiert!`)
                _currentPlayer.position = new mp.Vector3(player.position);
                currentPlayername++;
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            Notification.sendPlayerNotification(player, "ADMIN", "Der Spieler wurde nicht gefunden!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("tphereall", (player) => {
    if (player.getVariable("Admin") >= 7)
    {
        mp.players.forEach(_currentPlayer => {
            Notification.sendPlayerNotification(player, "ADMIN", `Du hast alle Spieler zu dir teleportiert!`)
            _currentPlayer.position = new mp.Vector3(player.position);
            currentPlayername++;
        });
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("setadmin", (player, fullText, clientname, newrank) => {
    if (player.getVariable("Admin") >= 7)
    {
        if (clientname == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                Notification.sendPlayerNotification(player, "ADMIN", `Du hast den Spieler ${clientname} den Admin-Rang ${newrank} gegeben!`);
                _currentPlayer.setVariable("Admin", parseInt(newrank));
                AccountHandler.saveAdminRank(_currentPlayer);
                currentPlayername++;
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            Notification.sendPlayerNotification(player, "ADMIN", "Der Spieler wurde nicht gefunden!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("setteam", (player, fullText, clientname, team, isleader) => {
    if (player.getVariable("Admin") >= 7)
    {
        if (clientname == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                switch (isleader) {
                    case 0:
                        Notification.sendPlayerNotification(player, "SERVER", `Du hast den Spieler ${clientname} in das Team: '${team}' gesetzt!`)
                        _currentPlayer.setVariable("PrivatTeam", team);
                        _currentPlayer.setVariable("PrivatTeamIsLeader", 0)
                        AccountHandler.saveTeamRank(_currentPlayer);
                    break;

                    case 1:
                        Notification.sendPlayerNotification(player, "SERVER", `Du hast den Spieler ${clientname} als anführer des Team: '${team}' gesetzt!`)
                        Notification.sendGlobalNotification(`${team}`, `Die Fraktion ${team} hat nun einen neuen Leader!`)
                        _currentPlayer.setVariable("PrivatTeam", team);
                        _currentPlayer.setVariable("PrivatTeamIsLeader", 1)
                        AccountHandler.saveTeamRank(_currentPlayer);
                    break;
                
                    default:
                    break;
                }
                currentPlayername++;
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            Notification.sendPlayerNotification(player, "ADMIN", "Der Spieler wurde nicht gefunden!")
        }
    } else {
        Notification.sendPlayerNotification(player, "SERVER", "Du hast keine rechte!")
    }
});

mp.events.addCommand("cc", (player) => {
    if (player.getVariable("Admin") >= 1)
    {
        Notification.sendGlobalNotification("CHAT CLEAR", `Der Chat wurde von ${player.name} gecleart`);
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
        mp.players.broadcast("");
    }
});

function getFraktionColorById(frakname) {
    switch (frakname) {
        case "Grove":
            return "!{0, 255, 0}";
        break;
        case "Bloods":
            return "!{255, 0, 0}";
        break;
        case "Ballas":
            return "!{187, 51, 255}";
        break;
        case "Vagos":
            return "!{255, 255, 0}";
        break;
        case "Crips":
            return "!{0, 0, 255}";
        break;
        case "LCN":
            return "!{0, 0, 0}";
        break;
        case "Yakuza":
            return "!{179, 0, 0}";
        break;
        case "Triaden":
            return "!{0, 21, 128}";
        break;
        case "LSPD":
            return "!{62, 128, 250}";
        break;
        case "MG13":
            return "!{52, 186, 235}";
        break;
        case "187":
            return "!{252, 141, 30}";
        break;
    
        default:
            return "!{120, 255, 0}";
        break;
    }
}

mp.events.addCommand("krieg", (player, fullText, team1, team2, soundname) => {
    if (player.getVariable("Admin") >= 4)
    {
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.broadcast(`[!{255, 0, 0}KRIEG!{255, 255, 255}] ${getFraktionColorById(team1)}${team1} !{255, 255, 255}gegen ${getFraktionColorById(team2)}${team2}`);
        mp.players.forEach(element => {
            element.call("GGW:OpenUI:Krieg");
            element.call("GGW:ExecuteUI:Krieg:StartSound", [`${soundname}`]);
        });
    }
});