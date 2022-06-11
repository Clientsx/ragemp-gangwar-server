const ComponentHandler = require("../ComponentHandler/index.js")

mp.events.add("GGW:ServerEvent:tryBuyWeaponComponent", (player, weaponname, compstring, preis) => {
    preis = parseInt(preis);
    if (player.getVariable("Money") >= preis)
    {
        player.setVariable("Money", parseInt(player.getVariable("Money")) -preis);
        ComponentHandler.createComponent(player, weaponname, compstring);
        ComponentHandler.giveComponent(player, weaponname, compstring)
        player.call("closeWeapontuner")
    }
    else
    {
        player.call("closeWeapontuner")
    }
});