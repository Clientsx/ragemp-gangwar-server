module.exports = { 
    loadGarageStarVehicles: async function(player, username){
        const [rows, fields, err] = await gangwar.query("SELECT * FROM garage WHERE Username = ?", [username])
        if(rows.length > 0){
            for (let i = 0; i < rows.length; i++) {
                player.call("GGW:Garage:LoadStarCars", [rows[i].GarageVehicleID]);
            }
        }
    },
    removeGarageStarVehicle: async function(username, vehicleid){
        vehicleid = parseInt(vehicleid);
        const [rows, fields, err] = await gangwar.query("DELETE FROM garage WHERE Username = ? AND GarageVehicleID = ?", [username, vehicleid])
        if (err) console.log(err);
    },
    addGarageStarVehicle: async function(username, vehicleid){
        vehicleid = parseInt(vehicleid);
        const [rows, fields, err] = await gangwar.query("INSERT INTO garage SET Username = ?, GarageVehicleID = ?", [username, vehicleid])
            if (err) console.log(err);
    },
    loadPrivatCars: async function(player){
        const [rows, fields, err] = await gangwar.query("SELECT * FROM vehicles WHERE owner = ?", [player.name])
        if(rows.length > 0){
            for (let i = 0; i < rows.length; i++) {
                player.call("GGW:ExecuteUI:Garage:LoadPrivatCars", [rows[i].model, 0]);
            }
        }
    },
};