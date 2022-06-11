const Notification = require("../Notification/index.js")

var kriegteam1 = "";
var kriegteam1punkte = 0;

var kriegteam2 = "";
var kriegteam2punkte = 0;

var kriegmaxpoints = 200;
var kriegtimer = null;

function startKrieg(teamn1name, team2name)
{
    kriegteam1 = teamn1name;
    kriegteam2 = team2name;

    kriegtimer = setTimeout(() => {
        if (kriegteam1punkte == kriegteam2punkte)
        {
            Notification.sendGlobalNotification("KRIEG", `Die Fraktionen ${kriegteam1} und ${kriegteam2} haben ein Unentschieden gespielt!`);
        } 
        else if (kriegteam1punkte > kriegteam2punkte)
        {
            Notification.sendGlobalNotification("KRIEG", `Die Fraktion ${kriegteam1} hat gegen ${kriegteam2} gewonnen!`);
        }
        else if (kriegteam1punkte < kriegteam2punkte)
        {
            Notification.sendGlobalNotification("KRIEG", `Die Fraktion ${kriegteam2} hat gegen ${kriegteam1} gewonnen!`);
        }
    }, 15000);
}

function updatePunkte()
{
    mp.players.forEach(element => {
        if (element.getVariable("isKrieg"))
        {
            element.call("GGW:ExecuteUI:Krieg:UpdatePoints", [`${kriegteam1punkte}`, `${kriegteam2punkte}`])
        }
    });
    checkPunkte();
}

function checkPunkte()
{
    if (kriegteam1punkte >= kriegmaxpoints)
    {
        Notification.sendGlobalNotification("KRIEG", `Die Fraktion ${kriegteam1} hat gegen ${kriegteam2} gewonnen!`);
        clearTimeout(kriegtimer);
        endKrieg();
    } 
    else if (kriegteam2punkte >= kriegmaxpoints)
    {
        Notification.sendGlobalNotification("KRIEG", `Die Fraktion ${kriegteam2} hat gegen ${kriegteam1} gewonnen!`);
        clearTimeout(kriegtimer);
        endKrieg();
    }
}

function endKrieg()
{
    kriegteam1 = "";
    kriegteam2 = "";
    kriegteam1punkte = 0;
    kriegteam2punkte = 0;
}

module.exports = { kriegteam1, kriegteam1punkte, kriegteam2, kriegteam2punkte, startKrieg, updatePunkte, endKrieg }