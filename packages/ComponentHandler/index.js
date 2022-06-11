module.exports = { 
    loadComponents: async function(player){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("SELECT * FROM components WHERE Username = ? ", [player.name])
            if(rows.length > 0){
                for (let i = 0; i < rows.length; i++) {
                    player.giveWeaponComponent(mp.joaat("weapon_" + rows[i].Weapon), mp.joaat(rows[i].Component));
                }
            }
        }
    },
    giveComponent: async function(player, weapon, compname){
        if (player)
        {
            player.giveWeaponComponent(mp.joaat("weapon_" + weapon), mp.joaat(compname));
        }
    },
    removeComponent: async function(player, weapon, compname){
        if (player)
        {
            player.removeWeaponComponent(mp.joaat("weapon_" + weapon), mp.joaat(compname));
        }
    },
    removeAllComponentsFromWeapon: async function(player, weapon){
        if (player)
        {
            player.removeAllWeaponComponents(mp.joaat("weapon_" + weapon));
        }
    },
    removeAllComponents: async function(player){
        if (player)
        {
            player.resetAllWeaponComponents();
        }
    },
    createComponent: async function(player, weaponname, compname){
        if (player)
        {
            const [rows, fields, err] = await gangwar.query("INSERT INTO components SET Username = ?, Weapon = ?, Component = ?", [player.name, weaponname, compname])
                if (err) console.log(err);
        }
    }
};