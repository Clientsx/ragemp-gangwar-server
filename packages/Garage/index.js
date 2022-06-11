const GarageHandler = require("../GarageHandler/index.js")
const Notification = require("../Notification/index.js")

// mp.events.add("GGW:ServerEvent:Garage:AddStarCar", (player, starcarid) => {
//     starcarid = parseInt(starcarid);
//     GarageHandler.addGarageStarVehicle(player.name, starcarid);
// });

// mp.events.add("GGW:ServerEvent:Garage:RemoveStar", (player, starcarid) => {
//     starcarid = parseInt(starcarid);
//     GarageHandler.removeGarageStarVehicle(player.name, starcarid);
// });

mp.events.add("GGW:ServerEvent:LoadPrivatCars", (player) => {
    GarageHandler.loadPrivatCars(player);
});

mp.events.add("GGW:ServerEvent:Garage:Ausparken", (player, selectedCar, carlevel) => {
    carlevel = parseInt(carlevel);
    if (player.getVariable("Level") >= carlevel)
    {
        parkoutVehicle(player, selectedCar);
    }
    else 
    {
        Notification.sendPlayerNotification(player, "Garage", "Dein Level reicht nicht aus!")
    }
});

function parkoutVehicle(player, carname)
{
    mp.vehicles.forEach(_vehicle => {
        if (_vehicle.getVariable("Owner") == player.name)
        {
            _vehicle.destroy();
        }
    });

    switch (player.getVariable("Fraktion")) {
        case "Grove":
            let distanceToGroveParkOut = player.dist(new mp.Vector3(95.27487182617188, -1959.0311279296875, 20.74538803100586));
            if (distanceToGroveParkOut >= 51) return;
            let grove = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(95.27487182617188, -1959.0311279296875, 20.74538803100586),
            {
                heading: -37,
                numberPlate: "Grove",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            grove.numberPlate = "Grove";
            player.putIntoVehicle(grove, 0);
            grove.setColor(57, 57);
            grove.setVariable("Owner", player.name);
            grove.data.headlightColor = 3;
        break;
        case "Bloods":
            let distanceToBloodsParkOut = player.dist(new mp.Vector3(1170.9813232421875, -1666.7586669921875, 36.71296691894531));
            if (distanceToBloodsParkOut >= 51) return;
            let bloods = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(1170.9813232421875, -1666.7586669921875, 36.71296691894531),
            {
                heading: 152,
                numberPlate: "Bloods",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            bloods.numberPlate = "Bloods";
            player.putIntoVehicle(bloods, 0);
            bloods.setColor(39, 39);
            bloods.setVariable("Owner", player.name);
            bloods.data.headlightColor = 8;
        break;
        case "Ballas":
            let distanceToBallasParkOut = player.dist(new mp.Vector3(-75.23112487792969, -1458.6875, 32.096004486083984));
            if (distanceToBallasParkOut >= 51) return;
            let ballas = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-75.23112487792969, -1458.6875, 32.096004486083984),
            {
                heading: -145,
                numberPlate: "Ballas",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            ballas.numberPlate = "Ballas";
            player.putIntoVehicle(ballas, 0);
            ballas.setColor(148, 148);
            ballas.setVariable("Owner", player.name);
            ballas.data.headlightColor = 11;
        break;
        case "Vagos":
            let distanceToVagosParkOut = player.dist(new mp.Vector3(313.9626159667969, -2023.148681640625, 20.531700134277344));
            if (distanceToVagosParkOut >= 51) return;
            let vagos = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(313.9626159667969, -2023.148681640625, 20.531700134277344),
            {
                heading: 50,
                numberPlate: "VAGOS",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            vagos.numberPlate = "Vagos";
            player.putIntoVehicle(vagos, 0);
            vagos.setColor(42, 42);
            vagos.setVariable("Owner", player.name);
            vagos.data.headlightColor = 6;
        break;
        case "Crips":
            let distanceToCripsParkOut = player.dist(new mp.Vector3(486.3067626953125, -1797.2421875, 28.404491424560547));
            if (distanceToCripsParkOut >= 51) return;
            let crips = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(486.3067626953125, -1797.2421875, 28.404491424560547),
            {
                heading: -126,
                numberPlate: "Crips",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            crips.numberPlate = "Crips";
            player.putIntoVehicle(crips, 0);
            crips.setColor(83, 83);
            crips.setVariable("Owner", player.name);
            crips.data.headlightColor = 1;
        break;
        case "LCN":
            let distanceToLcnParkOut = player.dist(new mp.Vector3(-1526.3837890625, 86.91582489013672, 56.56220626831055));
            if (distanceToLcnParkOut >= 51) return;
            let lcn = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1526.3837890625, 86.91582489013672, 56.56220626831055),
            {
                heading: -92,
                numberPlate: "LCN",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            lcn.numberPlate = "LCN";
            player.putIntoVehicle(lcn, 0);
            lcn.setColor(12, 12);
            lcn.setVariable("Owner", player.name);
            lcn.data.headlightColor = 10;
        break;
        case "Yakuza":
            let distanceToYakuzaParkOut = player.dist(new mp.Vector3(-1525.282958984375, 882.4125366210938, 181.7494354248047));
            if (distanceToYakuzaParkOut >= 51) return;
            let yakuza = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1525.282958984375, 882.4125366210938, 181.7494354248047),
            {
                heading: -77,
                numberPlate: "Yakuza",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            yakuza.numberPlate = "Yakuza";
            player.putIntoVehicle(yakuza, 0);
            yakuza.setColor(40, 40);
            yakuza.setVariable("Owner", player.name);
            yakuza.data.headlightColor = 8;
        break;
        case "Triaden":
            let distanceToTriadenParkOut = player.dist(new mp.Vector3(-1793.922607421875, 457.3161926269531, 128.30801391601562));
            if (distanceToTriadenParkOut >= 51) return;
            let triaden = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1793.922607421875, 457.3161926269531, 128.30801391601562),
            {
                heading: 87,
                numberPlate: "Triaden",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            triaden.numberPlate = "Triaden";
            player.putIntoVehicle(triaden, 0);
            triaden.setColor(82, 82);
            triaden.setVariable("Owner", player.name);
            triaden.data.headlightColor = 2;
        break;
        case "187":
            let distanceTo187ParkOut = player.dist(new mp.Vector3(-1595.950439453125, -60.30178451538086, 56.482486724853516));
            if (distanceTo187ParkOut >= 51) return;
            let t187 = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1580.8184814453125, -59.0748291015625, 56.4916877746582),
            {
                heading: -93,
                numberPlate: "187",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            t187.numberPlate = "187";
            player.putIntoVehicle(t187, 0);
            t187.setColor(130, 130);
            t187.setVariable("Owner", player.name);
            t187.data.headlightColor = 7;
        break;
        case "LSPD":
            let distanceToLSPDParkOut = player.dist(new mp.Vector3(458.7113037109375, -1017.2454223632812, 28.190053939819336));
            if (distanceToLSPDParkOut >= 51) return;
            let LSPD = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(422.8499755859375, -1021.7191162109375, 28.960290908813477),
            {
                heading: 88,
                numberPlate: "LSPD",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            LSPD.numberPlate = "LSPD";
            player.putIntoVehicle(LSPD, 0);
            LSPD.setColor(131, 131);
            LSPD.setVariable("Owner", player.name);
            LSPD.data.headlightColor = 2;
        break;
        case "MG13":
            let distanceToMG13ParkOut = player.dist(new mp.Vector3(1379.8125, -573.0780029296875, 74.34294891357422));
            if (distanceToMG13ParkOut >= 51) return;
            let MG13 = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(422.8499755859375, -1021.7191162109375, 28.960290908813477),
            {
                heading: 97,
                numberPlate: "LSPD",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            MG13.numberPlate = "MG13";
            player.putIntoVehicle(MG13, 0);
            MG13.setColor(70, 70);
            MG13.setVariable("Owner", player.name);
            MG13.data.headlightColor = 2;
        break;
    }
    player.call("GGW:CloseUI:Garage")
}