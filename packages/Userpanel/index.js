mp.events.add("Server:Userpanel:SaveCrosshair", (player, isActivated, selectedCrosshair) => {
    selectedCrosshair = parseInt(selectedCrosshair);
    player.setVariable("Crosshair", isActivated);
    player.setVariable("CrosshairID", selectedCrosshair);
    player.call("GGW:updateCrosshair", [selectedCrosshair])
});