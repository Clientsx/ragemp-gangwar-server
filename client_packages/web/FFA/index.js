let ffa = null,
ffacam = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:FFA", (p1, p2, p3) => {
    if (!ffa)
    {
        ffa = mp.browsers.new("package://web/FFA/index.html");
        ffa.execute(`updateFFA("${p1}", "${p2}", "${p3}");`);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);

        if (!ffacam)
        {
            ffacam = mp.cameras.new('default', new mp.Vector3(-1583.232421875, -1490.540283203125, -1.975684404373169), new mp.Vector3(0,0,0), 40);

            ffacam.pointAtCoord(-1565.010986328125, -1462.7919921875, -4.203614234924316); // Changes the rotation of the camera to point towards a location
            ffacam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
        }
    }
});

mp.events.add("GGW:CloseUI:FFA2", () => {
    if (ffa)
    {
        ffa.destroy();
        ffa = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.gui.chat.activate(true);

        if (ffacam)
        {
            ffacam.destroy();
            ffacam = null;
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
        }
    }
});

mp.events.add("GGW:CloseUI:FFA", () => {
    if (ffa)
    {
        ffa.destroy();
        ffa = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.gui.chat.activate(true);

        mp.events.callRemote("GGW:ServerEvent:ClosedFFA")

        if (ffacam)
        {
            ffacam.destroy();
            ffacam = null;
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
        }
    }
});

mp.events.add("GGW:ClientEvent:TryJoinFFA", (selectedFFA) => {
    if (ffa)
    {
        mp.events.callRemote("GGW:ServerEvent:TryJoinFFA", parseInt(selectedFFA));
    }
});