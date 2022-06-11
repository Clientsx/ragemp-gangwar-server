module.exports = { 
    isPlayerBanned: async function(serial){
        const [rows, fields, err] = await gangwar.query("SELECT Ban FROM accounts WHERE HWID = ?", [serial])
        if (err) console.log(err)
        if(rows.length > 0){
            let banid = rows[0].Ban;
            if (banid == 1)
            {
                return true;
            }
        }
    return false;
    },
    PlayerBann: async function(reason, clientname){
        const [rows, fields, err] = await gangwar.query('UPDATE accounts SET Ban = ?, Banreason = ? WHERE Username = ?', [1, reason, clientname])
            if(err) console.log(err);
    },
    PlayerUnbann: async function(clientname){
        const [rows, fields, err] = await gangwar.query('UPDATE accounts SET Ban = ?, Banreason = ? WHERE Username = ?', [0, "Keinen Grund angegeben", clientname])
            if(err) console.log(err);
    }
};