mp.events.add("resetAllKeys", (player) => {
    player.stopAnimation();
});

mp.events.add("FinishVerbandskasten", (player) => {
    player.health = 100;
    player.stopAnimation();
});

mp.events.add("FinishWeste", (player) => {
    player.armour = 100;
    player.stopAnimation();
    player.setClothes(9, 15, 2, 0);
});

mp.events.add('StartWeste', (player) => {
    player.playAnimation('anim@heists@narcotics@funding@gang_idle', 'gang_chatting_idle01', 50, 15)
});

mp.events.add('StartVerbandskasten', (player) => {
    player.playAnimation('amb@medic@standing@kneel@idle_a', 'idle_a', 50, 15)
});

mp.events.add('KeyM', (player) => {
    if (player.getVariable("haveMaskOn"))
    {
        player.setVariable("haveMaskOn", false);
        player.setClothes(1, 0, 0, 0);
    } else {
        player.setVariable("haveMaskOn", true);
        player.setClothes(1, parseInt(player.data.currentMaske), parseInt(player.data.currentMaskeTexture), 0);
    }
});