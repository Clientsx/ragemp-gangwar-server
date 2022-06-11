const TeamHandler = require("../TeamHandler/index.js")

mp.events.add('setClothes', (player, componentId, drawable, texture) => {
    if (player.getVariable("Admin") > 4)
    {
        if (player.getVariable("aduty"))
        {
			player.setClothes(parseInt(componentId), parseInt(drawable), parseInt(texture), 2);
		}
	}
});

mp.events.add('setProp', (player, componentId, drawable, texture) => {
	if (player.getVariable("Admin") > 4)
    {
        if (player.getVariable("aduty"))
        {
			player.setProp(parseInt(componentId), parseInt(drawable), parseInt(texture));
		}
	}
});

mp.events.add('saveOutfit', async (player, mascarasdrawable, mascarastexture, chapeusdrawable, chapeustexture, jaquetasdrawable, jaquetastexture, camisasdrawable, camisastexture, calcasdrawable, calcastexture, sapatosdrawable, sapatostexture, maosdrawable, maostexture) => {
	if (player.getVariable("Admin") > 4)
    {
        if (player.getVariable("aduty"))
        {
			mascarasdrawable = parseInt(mascarasdrawable);
			mascarastexture = parseInt(mascarastexture);
			chapeusdrawable = parseInt(chapeusdrawable);
			chapeustexture = parseInt(chapeustexture);
			jaquetasdrawable = parseInt(jaquetasdrawable);
			jaquetastexture = parseInt(jaquetastexture);
			camisasdrawable = parseInt(camisasdrawable);
			camisastexture = parseInt(camisastexture);
			calcasdrawable = parseInt(calcasdrawable);
			calcastexture = parseInt(calcastexture);
			sapatosdrawable = parseInt(sapatosdrawable);
			sapatostexture = parseInt(sapatostexture);
			maosdrawable = parseInt(maosdrawable);
			maostexture = parseInt(maostexture);
			await TeamHandler.createTeamClothes(player, mascarasdrawable, mascarastexture, chapeusdrawable, chapeustexture, jaquetasdrawable, jaquetastexture, camisasdrawable, camisastexture, calcasdrawable, calcastexture, sapatosdrawable, sapatostexture, maosdrawable, maostexture);
		}
	}
});