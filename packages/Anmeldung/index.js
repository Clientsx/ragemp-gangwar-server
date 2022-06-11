const AccountHandler = require("../AccountHandler/index.js");
const Notification = require("../Notification/index.js");
const InventarHandler = require("../InventarHandler/index.js");
const BanHandler = require("../BanHandler/index.js");
const gangwarutil = require("../Utils/index.js");
const Team = require("../Team/index.js")
const ComponentHadnler = require("../ComponentHandler/index.js")
const GarageHandler = require("../GarageHandler/index.js")

mp.events.add('playerJoin', async (player) => {
    if (await BanHandler.isPlayerBanned(player.serial))
    {
        player.kick();
    } else {
        player.setVariable("isLoggedIn", false)
        player.dimension = gangwarutil.getRandomInt(30, 80);
        player.spawn(new mp.Vector3(-722.7653198242188, -1428.4677734375, 5.000524520874023))
        player.heading = 137.23526000976562;
        player.call("GGW:OpenUI:Login")
        player.setVariable("Crosshair", false);
        player.setVariable("CrosshairID", 0);
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
        player.outputChatBox("")
    }
});

mp.events.add('GGW:ServerEvent:TryLogin', async (player, username) => {
    if (username.length <= 3) return player.call("Login:Failed", [`Der name ist zu kurz!`]);
    if(/[^a-z\d]/i.test(username)) return player.call("Login:Failed", [`Du darfst keine Sonderzeichen haben!`]);
    if (await AccountHandler.isUsernameExist(username))
    {
        if (await AccountHandler.isAccountOwner(player, username, player.socialClub))
        {
            player.name = username;
            player.call("GGW:CloseUI:Login")
            Team.openTeam(player);
            await InventarHandler.loadInventory(player);
            await ComponentHadnler.loadComponents(player);
            player.call("GGW:Client:LoadChar")
            player.data.disabledweapon = `Minigun`;
            player.setVariable("isLoggedIn", true)
        }
        else
        {
            player.call("Login:Failed", [`Dieser Account gehört dir nicht!`])
        }
    }
    else
    {
        if (await AccountHandler.isAccountExist(player.socialClub))
        {
            player.call("Login:Failed", [`Dieser Account Existiert nicht!`])
        }
        else
        {
            if (await AccountHandler.havePlayerAccount(player.serial))
            {
                player.call("Login:Failed", [`Du besitzt bereits einen Account!`])
            } 
            else
            {
                player.name = username;
                player.call("GGW:CloseUI:Login")
                player.setVariable("Admin", 0);
                player.setVariable("VIP", 0);
                player.setVariable("Money", 5000);
                player.setVariable("Kills", 1);
                player.setVariable("Deaths", 1);
                player.setVariable("Level", 1);
                player.setVariable("Xp", 0);
                player.setVariable("MaxXp", 50);
                player.setVariable("PrivatTeam", "NONE")
                player.setVariable("GWTokens", 10);
                player.setVariable("Geschenke", 1);
                player.setVariable("XpBoosts", 0);
                player.setVariable("PrivatTeam", null)
                player.setVariable("PrivatTeamIsLeader", 0)
                await AccountHandler.createPlayerAccount(player, username);
                await InventarHandler.createInventory(player);
                player.call("GGW:Client:Charcreator")
                player.data.disabledweapon = `Minigun`;
                player.setVariable("isLoggedIn", true)
            }
        }
    }
});