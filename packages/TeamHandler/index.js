const Team = require("../Team/index.js")

module.exports = { 
    loadAllTeams: async function(){
        const [rows, fields, err] = await gangwar.query("SELECT * FROM team", [])
        if(rows.length > 0){
            for (let i = 0; i < rows.length; i++) {
                mp.blips.new(rows[i].teamblip, new mp.Vector3(rows[i].teamposx, rows[i].teamposy, rows[i].teamposz),
                {
                    name: rows[i].teamname,
                    scale: 0.8,
                    color: rows[i].teamblipcolor,
                    shortRange: true,
                });
            }
        }
    },
    loadTeamPosition: async function(player){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("SELECT * FROM team WHERE teamname = ?", [player.getVariable("Fraktion")])
            if(rows.length > 0){
                if (rows[0].teamstate == 1)
                {
                    player.spawn(new mp.Vector3(rows[0].teamposx, rows[0].teamposy, rows[0].teamposz));
                    player.heading = rows[0].teamposr;
                    player.data.teamspawn = `${rows[0].teamposx.toFixed(1)}%${rows[0].teamposy.toFixed(1)}%${rows[0].teamposz.toFixed(1)}%${rows[0].teamposr.toFixed(1)}`;
                    player.setVariable("CurrentTeamstate", 1)
                    player.armour = 100;
                } else {
                    player.setVariable("CurrentTeamstate", 0)
                    player.spawn(new mp.Vector3(rows[0].teamposx, rows[0].teamposy, rows[0].teamposz));
                    player.heading = rows[0].teamposr;
                    player.data.teamspawn = null;
                    player.armour = 100;
                }
                player.call("GGW:OpenUI:HUD")
                player.call("GGW:updateHUD", [`${player.getVariable("Kills")}`, `${player.getVariable("Deaths")}`, `${player.getVariable("Xp")}`, `${player.getVariable("MaxXp")}`, `${player.getVariable("Level")}`]);
            }
        }
    },
    createTeam: async function(player, teamname, teamblip, teamblipcolor){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("INSERT INTO team SET teamname = ?, teamposx = ?, teamposy = ?, teamposz = ?, teamposr = ?, teamblip = ?, teamblipcolor = ?", [teamname, player.position.x, player.position.y, player.position.z, player.heading, teamblip, teamblipcolor])
                if (err) console.log(err);
        }
    },
    createTeamClothes: async function(player, mascarasdrawable, mascarastexture, chapeusdrawable, chapeustexture, jaquetasdrawable, jaquetastexture, camisasdrawable, camisastexture, calcasdrawable, calcastexture, sapatosdrawable, sapatostexture, maosdrawable, maostexture){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("INSERT INTO teamclothes SET frakname = ?, MaskD = ?, MaskT = ?, HatD = ?, HatT = ?, JacketD = ?, JacketT = ?, ShirtD = ?, ShirtT = ?, LegD = ?, LegT = ?, ShoesD = ?, ShoesT = ?, HandsD = ?, HandsT = ?", [player.getVariable("Fraktion"), mascarasdrawable, mascarastexture, chapeusdrawable, chapeustexture, jaquetasdrawable, jaquetastexture, camisasdrawable, camisastexture, calcasdrawable, calcastexture, sapatosdrawable, sapatostexture, maosdrawable, maostexture])
                if (err) console.log(err);
        }
    },
    loadTeamClothes: async function(player, outfitnumber){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("SELECT * FROM teamclothes WHERE frakname = ?", [player.getVariable("Fraktion")])
            if(rows.length > 0){
                outfitnumber = parseInt(outfitnumber);
                player.data.currentMaske = rows[outfitnumber].MaskD;
                player.data.currentMaskeTexture = rows[outfitnumber].MaskT;
                player.setClothes(1, rows[outfitnumber].MaskD, rows[outfitnumber].MaskT, 0)
                player.setProp(0, rows[outfitnumber].HatD, rows[outfitnumber].HatT);
                player.setClothes(11, rows[outfitnumber].JacketD, rows[outfitnumber].JacketT, 0)
                player.setClothes(8, rows[outfitnumber].ShirtD, rows[outfitnumber].ShirtT, 0)
                player.setClothes(4, rows[outfitnumber].LegD, rows[outfitnumber].LegT, 0)
                player.setClothes(6, rows[outfitnumber].ShoesD, rows[outfitnumber].ShoesT, 0)
                player.setClothes(3, rows[outfitnumber].HandsD, rows[outfitnumber].HandsT, 0)
            }
            player.setVariable("haveMaskOn", true);
        }
    },
    openOutfits: async function(player){
        if (player)
        {
            player.call("GGW:OpenUI:Outfits")
            player.spawn(new mp.Vector3(-75.28893280029297, -818.71875, 326.1751403808594))
            player.heading = 178.8;
            const [rows, fields, err] = await gangwar.query("SELECT * FROM teamclothes WHERE frakname = ?", [player.getVariable("Fraktion")])
            if(rows.length > 0){
                for (let i = 0; i < rows.length; i++) {
                    player.call("GGW:ExecuteUI:CreateOutfit")
                }
            }
        }
    }
};