module.exports = { 
    sendPlayerNotification: function(player, title, message){
        player.call("sendNotification", [title, message]);
    },
    sendGlobalNotification: function(title, message){
        mp.players.forEach(element => {
            element.call("sendNotification", [title, message]);
        });
    }
};