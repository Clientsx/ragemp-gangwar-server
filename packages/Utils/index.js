class Utils {
	constructor() {
	}

    roundNum(number, ends = 0) {
		return parseFloat(number.toFixed(ends));
	}

    isValueNumber(value) {
		if (typeof value !== "number") return false;
		return true;
	}

    isValueString(value) {
		if (typeof value !== "string") return false;
		return true;
	}

    getRandomInt(min = 0, max = 100) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

    getPlayersInRange(position, range) {
		if (!this.isValueNumber(range)) return false;
		const players = mp.players.toArray();
		const playersInRange = [];
		for (const player of players) {
			if (player.dist(position) < range) {
				playersInRange.push(player);
			}
		}
		return playersInRange;
	}

	getNearestPlayerInRange(position, range) {
		const playersInRange = this.getPlayersInRange(position, range);
		if (!playersInRange) return false;
		let nearestPlayer = 0;
		for (const player of playersInRange) {
			if (player.dist(position) < playersInRange[nearestPlayer].dist(position)) {
				nearestPlayer = playersInRange.indexOf(player);
			}
		}
		return playersInRange[nearestPlayer];
	}

    getTime() {
		const currentTime = new Date();
		let h = currentTime.getHours();
		let m = currentTime.getMinutes();
		let s = currentTime.getSeconds();
		if (h < 10) h = `0${h}`;
		if (m < 10) m = `0${m}`;
		if (s < 10) s = `0${s}`;
		return `${h}:${m}:${s}`;
	}

    getPlayerByGuid(id) {
		const players = mp.players.toArray();
		for (const player of players) {
			if (player.guid === id) return player;
		}
		return false;
	}

	getPlayerCoordJSON(player) {
		const obj = { 
			x: player.position.x, 
			y: player.position.y, 
			z: player.position.z, 
			rot: player.heading, 
			dim: player.dimension, 
		}
		if (player.vehicle) obj.rot = player.vehicle.rotation.z;
		return JSON.stringify(obj);
	}
}
const gangwarutil = new Utils();
module.exports = gangwarutil;