let garage = null,
player = mp.players.local;

let starcars = new Array();

mp.events.add("GGW:Garage:LoadStarCars", (starcarid) => {
    starcars.push(starcarid);
});

mp.events.add("GGW:Garage:RemoveStarCar", (starcarid) => {
    for (let i = 0; i < starcars.length; i++) {
        if (starcars[i] == starcarid)
        {
            starcars.splice(i, 1);
            mp.events.callRemote("GGW:ServerEvent:Garage:RemoveStar", starcars[i]);
        }
    }
    mp.events.call("GGW:CloseUI:Garage");
    setTimeout(() => {
        mp.events.call("GGW:OpenUI:Garage"); 
    }, 700);
});

mp.events.add("GGW:Garage:AddStarCar", (starcarid) => {
    starcars.push(starcarid);
    mp.events.callRemote("GGW:ServerEvent:Garage:AddStarCar", starcarid);
});

mp.events.add("GGW:OpenUI:Garage", () => {
    if (!garage)
    {
        garage = mp.browsers.new("package://web/Garage/index.html");
        for (let i = 0; i < starcars.length; i++) {
            garage.execute(`loadstarcars("${starcars[i]}");`)
        }
        garage.execute(`loadCars();`);
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        mp.events.callRemote("GGW:ServerEvent:LoadPrivatCars");
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);
    }
});

mp.events.add("GGW:CloseUI:Garage", () => {
    if (garage)
    {
        garage.destroy();
        garage = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.graphics.transitionFromBlurred(500);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("GGW:ExecuteUI:Garage:LoadPrivatCars", (carname, carlevel) => {
    if (garage)
    {
        garage.execute(`createprivatCar("${carname}", "${carlevel}");`)
    }
});

mp.events.add("GGW:ClientEvent:Garage:Ausparken", (selectedCar, carlevel) => {
    if (garage)
    {
        mp.events.callRemote("GGW:ServerEvent:Garage:Ausparken", selectedCar, carlevel)
    }
});