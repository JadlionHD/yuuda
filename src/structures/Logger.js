const moment = require("moment");
const chalk = require("chalk"); // make a colored log

module.exports.log = (content, type = "log") => { // OPTIONAL, default type is log
  const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]`;
  switch(type) {
  case "log": {
    return console.log(`[${chalk.blue(type.toUpperCase())}] ${timestamp} ${content}`);
  }
  case "ready": {
    return console.log(`[${chalk.green(type.toUpperCase())}] ${timestamp} ${content}`);
  }
  case "warn": {
    return console.log(`[${chalk.yellow(type.toUpperCase())}] ${timestamp} ${content}`);
  }
  case "error": {
    return console.log(`[${chalk.red(type.toUpperCase())}] ${timestamp} ${content}`);
  }
  default: throw new TypeError("Incorrect type");
  }
};