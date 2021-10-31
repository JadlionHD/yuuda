const express = require("express");
const app = express();
const logger = require("./Logger.js");
const path = require("path");
const port = process.env.PORT || 3000;

const WebService = (bot) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../public/views"));
  app.use(express.static(path.join(__dirname, "../public/assets")));


  app.get("/", (req, res) => {
    res.render("index", {client: bot.client, config: bot.config, webUrl: {fullUrl: `https://${req.get("host")}`}});
  });

  app.get("/commands", (req, res) => {
    res.render("commands", {client: bot.client, config: bot.config, commands: bot.commands, webUrl: {fullUrl: `https://${req.get("host")}`}});
  });

  app.listen(port, () => {
    logger.log("Web service has been started!", "ready");
  });
};

module.exports = {
  WebService
};