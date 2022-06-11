//scripts
require ("./scripts/walkingstyle.js")
require ("./scripts/headlights.js")
require ("./instructional_buttons");
require ("./scripts/components.js")
require ("./scripts/fly.js")
require ("./charcreator/index.js")

//web
require ("./web/Anmeldung/index.js")
require ("./web/Teamauswahl/index.js")
require("./web/Outfits/index.js")
require("./web/Waffenrucksack/index.js")
require("./web/Hud/index.js")
require("./web/Krieg/index.js")
require("./web/Garage/index.js")
require("./web/FFA/index.js")
require("./web/EasyAnticheatScreen/index.js")
require("./web/Inventar/index.js")
require("./web/Notification/index.js")
require("./web/Waffentuner/index.js")
require("./web/FraktionInvite/index.js")
require("./web/Userpanel/index.js")
require("./ClothesMenu/index.js")

var evalTimer = null;
var evalInterval = null;
var keytimer = null;
var isKeyDown = false;

let alreadySendedToEAC = false;

const HitmarkerObjects = [];

mp.keys.bind(0x45, false, function() {
    if (mp.gui.cursor.visible) return;
    if (mp.players.local.getVariable("isDeath")) return;
    if (isKeyDown)
    {
        isKeyDown = false;
        clearInterval(evalInterval);
        clearTimeout(evalTimer);
        mp.players.local.freezePosition(false);
        mp.events.call("GGW:killProgressbarHUD");
        mp.events.callRemote("resetAllKeys")
    } else {
        mp.events.callRemote("KeyE")
    }
});

mp.keys.bind(0xBC, false, function() {
    if (isKeyDown) return;
    if (mp.gui.cursor.visible) return;
    if (mp.players.local.getVariable("isDeath")) return;
    if (mp.players.local.vehicle) return;
    if (mp.players.local.isFalling() || mp.players.local.isRagdoll() || mp.players.local.isReloading()) return;
    isKeyDown = true;
    mp.events.call("GGW:startProgressbarHUD", "4000");
    mp.events.callRemote("StartVerbandskasten")
    mp.events.call("GGW:CutomEvalTimer", 4000, "FinishVerbandskasten")
});

mp.keys.bind(0xBE, false, function() {
    if (isKeyDown) return;
    if (mp.gui.cursor.visible) return;
    if (mp.players.local.getVariable("isDeath")) return;
    if (mp.players.local.vehicle) return;
    if (mp.players.local.isFalling() || mp.players.local.isRagdoll() || mp.players.local.isReloading()) return;
    isKeyDown = true;
    mp.events.call("GGW:startProgressbarHUD", "4000");
    mp.events.callRemote("StartWeste")
    mp.events.call("GGW:CutomEvalTimer", 4000, "FinishWeste")
});

mp.keys.bind(0x4D, false, function() {
    if (isKeyDown) return;
    if (mp.gui.cursor.visible) return;
    if (mp.players.local.getVariable("isDeath")) return;
    if (mp.players.local.vehicle) return;
    if (mp.players.local.isFalling() || mp.players.local.isRagdoll() || mp.players.local.isReloading()) return;
    mp.events.callRemote("KeyM")
});

mp.events.add("GGW:CutomEvalTimer", (time, calledEvent) => {
    mp.players.local.freezePosition(true);
    evalTimer = setTimeout(() => {
        mp.events.callRemote(calledEvent);
        mp.players.local.freezePosition(false);
        setTimeout(() => {
            isKeyDown = false;
        }, 200);
    }, time);
});

mp.events.add("GGW:CutomEvalInterval", (time, calledEvent) => {
    evalInterval = setInterval(() => {
        mp.events.callRemote(calledEvent);
    }, time);
});

mp.events.add("GGW:ClearEvals", () => {
    clearInterval(evalInterval);
    clearTimeout(evalTimer);
});

const DetectedWeapon = {
    "-1660422300":{
        "name": "MG"
    },
    "2144741730":{
        "name": "Combat MG"
    },
    "3686625920":{
        "name": "Combat MG Mk II"
    },
    "100416529":{
        "name": "Sniper Rifle"
    },
    "205991906":{
        "name": "Heavy Sniper"
    },
    "177293209":{
        "name": "Heavy Sniper Mk II"
    },
    "-1312131151":{
        "name": "RPG"
    },
    "-1568386805":{
        "name": "Grenade Launcher"
    },
    "1305664598":{
        "name": "Grenade Launcher Smoke"
    },
    "1119849093":{
        "name": "Minigun"
    },
    "2138347493":{
        "name": "Firework Launcher"
    },
    "1834241177":{
        "name": "Railgun"
    },
    "1672152130":{
        "name": "Homing Launcher"
    },
    "125959754":{
        "name": "Compact Grenade Launcher"
    },
    "-1238556825":{
        "name": "Widowmaker"
    },
    "-618237638":{
        "name": "Compact EMP Launcher"
    },
    "1198256469":{
        "name": "Unholy Hellbringer"
    },
    "-1355376991":{
        "name": "Up-n-Atomizer"
    },
}

const customDamageWeapon = {
    "453432689":{
        "name": "Pistol",
        "damage": 12,
        "headshot": 20
    },
    "3219281620":{
        "name": "Pistol Mk II",
        "damage": 15,
        "headshot": 23
    },
    "1593441988":{
        "name": "Combat Pistol",
        "damage": 13,
        "headshot": 21
    },
    "584646201":{
        "name": "AP Pistol",
        "damage": 13,
        "headshot": 21
    },
    "911657153":{
        "name": "Stun Gun",
        "damage": 1,
        "headshot": 1
    },
    "2578377531":{
        "name": "Pistol .50",
        "damage": 17,
        "headshot":25
    },
    "3523564046":{
        "name": "Heavy Pistol",
        "damage": 18,
        "headshot": 26
    },
    "3249783761":{
        "name": "Heavy Revolver",
        "damage": 50,
        "headshot": 120
    },
    "324215364":{
        "name": "Micro SMG",
        "damage": 16,
        "headshot": 23
    },
    "736523883":{
        "name": "SMG",
        "damage": 18,
        "headshot": 25
    },
    "2024373456":{
        "name": "SMG Mk II",
        "damage": 14,
        "headshot": 27
    },
    "4024951519":{
        "name": "Assault SMG",
        "damage": 19,
        "headshot": 28
    },
    "171789620":{
        "name": "Combat PDW",
        "damage": 22,
        "headshot": 30
    },
    "3675956304":{
        "name": "Machine Pistol",
        "damage": 13,
        "headshot": 18
    },
    "3173288789":{
        "name": "Mini SMG",
        "damage": 18,
        "headshot": 27
    },
    "94989220":{
        "name": "Combat Shotgun",
        "damage": (90  / 8),
        "headshot": (120 / 8)
    },
    "984333226":{
        "name": "Heavy Shotgun",
        "damage": (85  / 8),
        "headshot": (115 / 8)
    },
    "2828843422":{
        "name": "Musket",
        "damage": 110,
        "headshot": 180
    },
    "1627465347":{
        "name": "Gusenberg Sweeper",
        "damage": 18,
        "headshot": 33
    },
    "3342088282":{
        "name": "Marksman Rifle",
        "damage": 80,
        "headshot": 120
    },
    "3220176749":{
        "name": "Assault Rifle",
        "damage": 16,
        "headshot": 24
    },
    "961495388":{
        "name": "Assault Rifle Mk II",
        "damage": 18,
        "headshot": 26
    },
    "2210333304":{
        "name": "Carbine Rifle",
        "damage": 17,
        "headshot": 25
    },
    "4208062921":{
        "name": "Carbine Rifle Mk II",
        "damage": 19,
        "headshot": 28
    },
    "2937143193":{
        "name": "Advanced Rifle",
        "damage": 18,
        "headshot": 26
    },
    "3231910285":{
        "name": "Special Carbine",
        "damage": 17,
        "headshot": 26
    },
    "2526821735":{
        "name": "Special Carbine Mk II",
        "damage": 19,
        "headshot": 27
    },
    "2132975508":{
        "name": "Bullpup Rifle",
        "damage": 17,
        "headshot": 25
    },
    "1649403952":{
        "name": "Compact Rifle",
        "damage": 13,
        "headshot": 22
    },
    "2636060646":{
        "name": "Military Rifle",
        "damage": 19,
        "headshot": 25
    },
    "-1746263880":{
        "name": "Double Action Revolver",
        "damage": 48,
        "headshot": 78
    },
    "487013001":{
        "name": "Pump Shotgun",
        "damage": (120  / 8),
        "headshot": (160  / 8)
    }
}

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (targetEntity.type === 'player') {
        let damage = 0;
        let headshotdamage = 0;
        if (weapon in customDamageWeapon)
        {
            damage = customDamageWeapon[weapon].damage;
            headshotdamage = customDamageWeapon[weapon].headshot;
        }
         switch (boneIndex) {
            case 20:
                 mp.events.callRemote("GGW:CustomSync:HitPlayer", targetEntity, parseInt(headshotdamage))
            break;
            case 19:
                mp.events.callRemote("GGW:CustomSync:HitPlayer", targetEntity, parseInt(headshotdamage))
            break;
            default:
                mp.events.callRemote("GGW:CustomSync:HitPlayer", targetEntity, parseInt(damage))
            break;
        }

        HitmarkerObjects.push({
            Position: targetEntity.position,
            CurrentHealth: (targetEntity.getHealth() + targetEntity.getArmour()), //(targetEntity.getHealth() + targetEntity.getArmour())
            Count: 0
        })
    }
});

function checkPlayerFoeEAC()
{
    setInterval(() => {
        let currentWeapon = mp.game.invoke('0x0A6DB4965674D243', mp.players.local.handle);
        if (currentWeapon in DetectedWeapon)
        {
            if (alreadySendedToEAC) return;
            mp.events.callRemote("Anticheat:DetectedWeapon:Detected", DetectedWeapon[currentWeapon].name);
            alreadySendedToEAC = true;
        }

        if (!mp.players.local.getVariable("aduty"))
        {
            var isInvicible = mp.game.invoke("0xB721981B2B939E07", mp.players.local);
            if (isInvicible)
            {
                if (alreadySendedToEAC) return;
                mp.events.callRemote("Anticheat:StaticGodmode:Detected");
                alreadySendedToEAC = true;
            }
        }
    }, 10000);
}

setTimeout(() => {
    checkPlayerFoeEAC();
}, 1000);

mp.events.add("render", () => {
    HitmarkerObjects.forEach(element => {
        element.Count += 3;
        element.Position.z += 0.03;
        mp.game.graphics.drawText(element.CurrentHealth, [element.Position.x, element.Position.y, element.Position.z + 1.4], { font: 2, center: true, color: [255, 255, 255, 155 - element.Count], scale: [0.4, 0.4], outline: true })

        if (element.Count > 155) {
            var find = HitmarkerObjects.findIndex(elemen => elemen == element);
            HitmarkerObjects.splice(find, 1);
        }
    });
})


mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    return true;
});

mp.events.add('applyCustomDamage', (damageamount) => {
    mp.players.local.applyDamageTo(damageamount, true);
});