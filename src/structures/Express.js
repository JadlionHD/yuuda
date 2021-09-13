const app = require("express")();
const logger = require("./Logger.js");
const path = require("path");
const port = process.env.PORT || 3000;

const WebService = (ClientBot) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../public/views"));


  app.get("/", (req, res) => {
    res.render("index", {client: ClientBot, config: {fullUrl: `https://${req.get("host")}`}});
  });


  app.listen(port, () => {
    logger.log("Web service has been started!", "ready");
  });
};

module.exports = {
  WebService
};