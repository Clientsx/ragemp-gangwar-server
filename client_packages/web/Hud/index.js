let hud = null;
let showed = false;
let player = mp.players.local;

mp.events.add("GGW:OpenUI:HUD", () => {
    if (!hud)
    {
        hud = mp.browsers.new("package://web/Hud/index.html");
    }
});

mp.events.add("GGW:updateHUD", (kills, deaths, xp, maxxp, level) => {
    if (hud)
    {
        hud.execute(`updateHud("${kills}", "${deaths}", "${xp}", "${maxxp}", "${level}");`);
    }
});

mp.events.add("GGW:startProgressbarHUD", (time) => {
    if (hud)
    {
        hud.execute(`startProgressbar("${time}");`);
    }
});

mp.events.add("GGW:killProgressbarHUD", () => {
    if (hud)
    {
        hud.execute(`killprogressbar();`);
    }
});

mp.events.add("GGW:updateCrosshair", (id) => {
    if (hud)
    {
        hud.execute(`changeCrosshair(${id});`);
    }
});

mp.events.add("GGW:updateHUDAdminStatus", (toggle) => {
    if (hud)
    {
        hud.execute(`toggleAdmindienst(${toggle});`);
    }
});

mp.events.add("GGW:showKillerScreen", (username) => {
    if (hud)
    {
        hud.execute(`showKill("${username}");`);
    }
});

mp.events.add("GGW:CloseUI::HUD", () => {
    if (hud)
    {
        hud.destroy();
        hud = null;
    }
});

mp.events.add('render', () =>
{
    if (hud)
    {
        if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle)
        {
            if(showed === false)
            {
                hud.execute("toggleVehicleHud(true);");
                showed = true;
            }
    
            let vel1 = player.vehicle.getSpeed() * 3.6;
            let vel = (vel1).toFixed(0);
            
            hud.execute(`updateVehicleHud(${vel});`);
        }
        else
        {
            if(showed)
            {
                hud.execute("toggleVehicleHud(false);");
                showed = false;
            }
        }
    }
});