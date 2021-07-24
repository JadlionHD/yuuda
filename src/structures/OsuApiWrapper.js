const axios = require("axios");
const { OsuGameModes, OsuGameModesName} = require("./Constants.js");

// Using v1 legacy osu api
// Docs: https://github.com/ppy/osu-api/wiki
const baseURL = "https://osu.ppy.sh/api";


/**
 * not sure why i made on here not in the class lol
 * @param {endpoints} <string> - Endpoints of the api
 * @param {query} <string> - Insert some queries including endpoints
 * @param {methods} <string>
 * */
function _request(endpoints, query, methods = "GET") {
  if(!endpoints || typeof endpoints !== "string") throw new TypeError("No endpoints specified");
  if(!query || typeof query !== "string") throw new TypeError("No query specified");

  return new Promise((resolve, reject) => {
    axios({
      url: `${baseURL}${endpoints}?k=${process.env.OSU_TOKEN}${query}`,
      method: methods
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}


class OsuAPI {

  /**
	* Get User Data
	* @param {name} <string> - User id or name
	* @param {mode} <string> - Ingame modes
	* @return Promise<Osu_Data>
	* */
  static getUser(name, mode = "standard") {
    if(!name || typeof name !== "string") throw new TypeError("No username specified");
    return new Promise((resolve, reject) => {
      _request("/get_user", `&u=${name}&m=${OsuGameModes[mode]}`).then((res) => {
        res.data[0]["mode"] = OsuGameModesName[mode];
        resolve(res.data[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
	* Get User Recent Playing Data
	* @param {name} <string> - User id or name
	* @param {mode} <string> - Ingame modes
	* @return Promise<Osu_Data>
	* */
  static getUserRecent(name, mode = "standard") {
    if(!name || typeof name !== "string") throw new TypeError("No username specified");
    return new Promise((resolve, reject) => {
      _request("/get_recent_user", `&u=${name}&m=${OsuGameModes[mode]}`).then((res) => {
        res.data[0]["mode"] = OsuGameModesName[mode];
        resolve(res.data[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
	 * Get User Best Performance Play Data
	 * @param {name} <string> - User id or name
	 * @param {mode} <string> - Ingame modes
	 * @return Promise<Osu_Data>
	 *  */
  static getUserBest(name, mode = "standard") {
    if(!name || typeof name !== "string") throw new TypeError("No username specified");
    return new Promise((resolve, reject) => {
      _request("/get_user_best", `&u=${name}&m=${OsuGameModes[mode]}`).then((res) => {
        res.data[0]["mode"] = OsuGameModesName[mode];
        resolve(res.data[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = OsuAPI;