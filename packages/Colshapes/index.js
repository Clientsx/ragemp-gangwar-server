const KriegHandler = require("../Krieg/index.js")

function playerEnterColshapeHandler(player, shape) {
    if (shape.getVariable("isShapeAGrage"))
    {
        player.setVariable("canOpenGarage", true);
        player.call("GGW:ClientEvent:ToggleButtonHUD", [true])
    } else if (shape.getVariable("isShapeALootbox"))
    {
        player.setVariable("canOpenLootbox", true);
        player.call("GGW:ClientEvent:ToggleButtonHUD", [true])
    } else if (shape.getVariable("isShapeAKrieg"))
    {
        if (player.getVariable("Fraktion") == KriegHandler.kriegteam1)
        {
            player.setVariable("isKrieg", true);
            player.call("GGW:OpenUI:Krieg", [`${KriegHandler.kriegteam1}`, `${KriegHandler.kriegteam2}`])
        }
        else if (player.getVariable("Fraktion") == KriegHandler.kriegteam2)
        {
            player.setVariable("isKrieg", true);
            player.call("GGW:OpenUI:Krieg", [`${KriegHandler.kriegteam1}`, `${KriegHandler.kriegteam2}`])
        } else {
            player.notify("~r~Du bist nicht am Krieg beteiligt!")
            player.position = new mp.Vector3(2654.278564453125, 1693.528076171875, 24.488218307495117);
        }
    } else if (shape.getVariable("isShapeAVehicleLootBox"))
    {
        player.call("GGW:ClientEvent:ToggleButtonHUD", [true])
        player.setVariable("canLootVehicleLootbox", true);
    }
}

function playerExitColshapeHandler(player, shape) {
    player.setVariable("canOpenGarage", false);
    player.setVariable("canOpenLootbox", false);
    player.setVariable("isKrieg", false);
    player.setVariable("canLootVehicleLootbox", false);
    player.call("GGW:CloseUI:Krieg")
    player.call("GGW:ClientEvent:ToggleButtonHUD", [false])
}
  
mp.events.add("playerExitColshape", playerExitColshapeHandler);
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

mp.events.add("KeyE", (player) => {
    if (player.getVariable("canOpenGarage"))
    {
        player.call("GGW:OpenUI:Garage")
    } else if (player.getVariable("canOpenLootbox"))
    {
        
    } else if (player.getVariable("canLootVehicleLootbox"))
    {
        
    } else {
        return;
    }
});

let kriegshape = mp.colshapes.newCircle(2738.5185546875, 1517.1273193359375, 75, 99);
kriegshape.setVariable("isShapeAKrieg", true);

mp.markers.new(1, new mp.Vector3(2738.5185546875, 1517.1273193359375, 23.497283935546875), 150,
    {
        color: [120, 0, 0, 120],
        visible: true,
        dimension: 99
});


let garage0 = mp.colshapes.newCuboid(-1595.950439453125, -60.30178451538086, 56.482486724853516, 2, 2, 2, 0)
garage0.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(-1595.950439453125, -60.30178451538086, 56.482486724853516), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage1 = mp.colshapes.newCuboid(-1534.43, 80.3046, 56.7743, 2, 2, 2, 0)
garage1.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(-1534.43, 80.3046, 56.7743), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage2 = mp.colshapes.newCuboid(458.7113037109375, -1017.2454223632812, 28.190053939819336, 2, 2, 2, 0)
garage2.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(458.7113037109375, -1017.2454223632812, 28.190053939819336), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage3 = mp.colshapes.newCuboid(1379.8125, -573.0780029296875, 74.34294891357422, 2, 2, 2, 0)
garage3.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(1379.8125, -573.0780029296875, 74.34294891357422), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage4 = mp.colshapes.newCuboid(1154.21484375, -1663.58544921875, 36.566951751708984, 2, 2, 2, 0)
garage4.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(1154.21484375, -1663.58544921875, 36.566951751708984), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage5 = mp.colshapes.newCuboid(-68.69120025634766, -1458.0101318359375, 32.115047454833984, 2, 2, 2, 0)
garage5.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(-68.69120025634766, -1458.0101318359375, 32.115047454833984), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage6 = mp.colshapes.newCuboid(102.76045227050781, -1959.675537109375, 20.825904846191406, 2, 2, 2, 0)
garage6.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(102.76045227050781, -1959.675537109375, 20.825904846191406), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage7 = mp.colshapes.newCuboid(336.53765869140625, -2035.3465576171875, 21.31669044494629, 2, 2, 2, 0)
garage7.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(336.53765869140625, -2035.3465576171875, 21.31669044494629), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage8 = mp.colshapes.newCuboid(479.2607421875, -1792.46337890625, 28.55357551574707, 2, 2, 2, 0)
garage8.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(479.2607421875, -1792.46337890625, 28.55357551574707), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage9 = mp.colshapes.newCuboid(-1525.8533935546875, 869.814208984375, 181.82571411132812, 2, 2, 2, 0)
garage9.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(-1525.8533935546875, 869.814208984375, 181.82571411132812), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});

let garage10 = mp.colshapes.newCuboid(-1785.373779296875, 456.4223937988281, 128.30799865722656, 2, 2, 2, 0)
garage10.setVariable("isShapeAGrage", true);
mp.markers.new(2, new mp.Vector3(-1785.373779296875, 456.4223937988281, 128.30799865722656), 1.5,
    {
        color: [255, 255, 255, 100],
        visible: true,
        dimension: 0
});