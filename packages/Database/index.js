let mysql = require("mysql2/promise");

global.gangwar = mysql.createPool({
	host: "localhost", 
	user: "root",
	password: "",
	database: "gangwar",
});