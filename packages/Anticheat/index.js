const BanHandler = require("../BanHandler/index.js")

mp.events.add('Anticheat:DetectedWeapon:Detected', (player, weaponname) => {
    if (player.getVariable("isLoggedIn"))
    {
        mp.players.broadcast(`[!{255, 0, 0}ANTICHEAT!{255, 255, 255}] ` + player.name + " wurde vom AntiCheat gebannt! Grund: Cheating - Detected Weapon: "+weaponname);
        player.call("GGW:OpenUI:EasyAnticheatScreen", [`Cheating - Detected Weapon: ${weaponname}`])
        BanHandler.PlayerBann("Cheating", player.name)
    }
});

mp.events.add('Anticheat:StaticGodmode:Detected', (player) => {
    if (player.getVariable("isLoggedIn"))
    {
        mp.players.broadcast(`[!{255, 0, 0}ANTICHEAT!{255, 255, 255}] ` + player.name + " wurde vom AntiCheat gebannt! Grund: Cheating - Static Godmode");
        player.call("GGW:OpenUI:EasyAnticheatScreen", [`Cheating - Static Godmode`])
        BanHandler.PlayerBann("Cheating", player.name)
    }
});

mp.events.add('Anticheat:MultiplerDamage:Detected', (player) => {
    if (player.getVariable("isLoggedIn"))
    {
        mp.players.broadcast(`[!{255, 0, 0}ANTICHEAT!{255, 255, 255}] ` + player.name + " wurde vom AntiCheat gebannt! Grund: Cheating - Damage Multipler");
        player.call("GGW:OpenUI:EasyAnticheatScreen", [`Cheating - Damage Multipler`])
        BanHandler.PlayerBann("Cheating", player.name)
    }
});

mp.events.add('Anticheat:SuperJump:Detected', (player) => {
    if (player.getVariable("isLoggedIn"))
    {
        mp.players.broadcast(`[!{255, 0, 0}ANTICHEAT!{255, 255, 255}] ` + player.name + " wurde vom AntiCheat gebannt! Grund: Cheating - Super Jump");
        player.call("GGW:OpenUI:EasyAnticheatScreen", [`Cheating - Super Jump`])
        BanHandler.PlayerBann("Cheating", player.name)
    }
});