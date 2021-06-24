const webApp = require("express")();
const logger = require("./Logger.js");

const WebService = () => {
  webApp.get("/", (req, res) => {
    res.send("yes");
  });
  webApp.listen(3000, () => {
    logger.log("Web service has been started!", "ready");
  });
};

module.exports = {
  WebService
};