let notification = mp.browsers.new("package://web/Notification/index.html")

mp.events.add("sendNotification", (title, message) => {
    if (notification)
    {
        notification.execute(`createNotify("${title}", "${message}");`);
        mp.game.audio.playSound(-1, "CHALLENGE_UNLOCKED", "HUD_AWARDS", true, 0, true);
    }
});