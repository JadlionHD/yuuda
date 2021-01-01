const express = require("express");
const app = express();

module.exports = (client) => {
	const port = process.env.PORT || 3000;
	const path = require("path");

	app.set("view engine", "ejs");
	app.set("views", path.join(__dirname, "../views"));

	app.get("/", (req, res) => {
		res.render("index", {client: client});
	})
	// load all routes, but we not need this for a while
	// const route = readdirSync("./src/routes");
	// for(const name of route) {
	// 	let router = require(`../routes/${name}`);
	// 	let routerName = name.replace(".js", "");
	// 	app.use(`/${routerName}`, router);
	// }
	app.listen(port, () => {
		console.log(`Listening on port ${port}`)
	})
}