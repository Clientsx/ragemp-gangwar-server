function getAdminRankByName(id)
{
    switch (id) {
        case 0:
            return "!{255, 255, 255}Spieler";
        break;
        case 1:
            return "!{93, 138, 168}Test Supporter";
        break;
        case 2:
            return "!{#84DE02}Supporter";
        break;
        case 3:
            return "!{0, 48, 143}Moderator";
        break;
        case 4:
            return "!{#FF7E00}Administrator";
        break;
        case 5:
            return "!{#6A0080}Super Administrator";
        break;
        case 6:
            return "!{#B30000}Manager";
        break;
        case 7:
            return "!{#D3212D}Stv. Projektleitung";
        break;
        case 8:
            return "!{255, 0, 0}Projektleitung";
        break;
        default:
            return "!{255, 0, 255}Opfer"
        break;
    }
}

function getFraktionColorById(player) {
    switch (player.getVariable("Fraktion")) {
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

function getVipColor(player) {
    switch (player.getVariable("VIP")) {
        case 1:
            return "!{0, 255, 0}";
        break;
        case 2:
            return "!{255, 0, 0}";
        break;
        case 3:
            return "!{187, 51, 255}";
        break;
    }
}

mp.events.add("playerChat", (player, message) => {
    if (message == null) return;
    if (player.getVariable("VIP") > 0)
    {
        mp.players.broadcast(`${getFraktionColorById(player)}${player.getVariable("Fraktion")}!{255, 255, 255} | [${getAdminRankByName(player.getVariable("Admin"))}!{255, 255, 255}][${getVipColor(player)}VIP!{255, 255, 255}] ${player.name} [${player.id}] » ${message}`);
    } else {
        mp.players.broadcast(`${getFraktionColorById(player)}${player.getVariable("Fraktion")}!{255, 255, 255} | [${getAdminRankByName(player.getVariable("Admin"))}!{255, 255, 255}] ${player.name} [${player.id}] » ${message}`);
    }
});

mp.events.addCommand("t", (player, message) => {
    mp.players.forEach(_player => {
        if(_player.getVariable("Fraktion") == player.getVariable("Fraktion"))
        {
            _player.outputChatBox(`[!{#00AAFF}TEAMCHAT!{255, 255, 255}] | [${getAdminRankByName(player.getVariable("Admin"))}!{255, 255, 255}] ${player.name} [${player.id}] » ${message}`)
        }
    });
});

mp.events.addCommand("a", (player, message) => {
    if(player.getVariable("Admin") > 0)
    {
        mp.players.forEach(_player => {
            if(_player.getVariable("Admin") > 0)
            {
                _player.outputChatBox(`[!{255, 0, 0}ADMIN-CHAT!{255, 255, 255}] | [${getAdminRankByName(player.getVariable("Admin"))}!{255, 255, 255}] ${player.name} [${player.id}] » ${message}`)
            }
        });
    }
});

mp.events.addCommand("vip", (player, message) => {
    if(player.getVariable("VIP") == 0) return;
    mp.players.forEach(_player => {
        if(_player.getVariable("VIP") > 0)
        {
            _player.outputChatBox(`[!{#00AAFF}VIP-CHAT!{255, 255, 255}] | [${getAdminRankByName(player.getVariable("Admin"))}!{255, 255, 255}][${getVipColor(player)}VIP!{255, 255, 255}] ${player.name} [${player.id}] » ${message}`)
        }
    });
});