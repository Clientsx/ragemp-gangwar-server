module.exports = { 
    loadInventory: async function(player){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("SELECT * FROM inventory WHERE Username = ?", [player.name])
            if(rows.length > 0){
                player.setVariable("GWTokens", rows[0].Tokens);
                player.setVariable("Geschenke", rows[0].Gifts);
                player.setVariable("XpBoosts", rows[0].XpBoost);
            }
        }
    },
    updateInventory: async function(player){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("UPDATE inventory SET Tokens = ?, Gifts = ?, XpBoost = ? WHERE Username = ?", [player.getVariable("GWTokens"), player.getVariable("Geschenke"), player.getVariable("XpBoosts"), player.name])
                if (err) console.log(err);
        }
    },
    createInventory: async function(player){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("INSERT INTO inventory SET Username = ?, Tokens = ?, Gifts = ?, XpBoost = ?", [player.name, 10, 1, 0])
                if (err) console.log(err);
        }
    }
};