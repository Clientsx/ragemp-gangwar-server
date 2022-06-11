mp.events.add('GGW:CustomSync:HitPlayer', (player, targetEntity, bonedamage) => {
    if (player == null || targetEntity == null) return;
    targetEntity.call("applyCustomDamage", [parseInt(bonedamage)]);
    targetEntity.setVariable("lasthitter", player);
});