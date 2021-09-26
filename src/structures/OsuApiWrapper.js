const axios = require("axios");
const { OsuGameModes, OsuGameModesName} = require("./Constants.js");

// Using v1 legacy osu api
// Docs: https://github.com/ppy/osu-api/wiki

/** Represent class osu api */
class OsuAPI {
  #token;

  /**
  * @param {string} - Your secret osu token
  */
  constructor(osuToken) {
    if(!osuToken) throw new Error("Osu Token required");

    /** 
     * @property {string} baseURL - Base url osu api 
     * */
    this.baseURL = "https://osu.ppy.sh/api";
    this.#token = osuToken;
  }

  /**
   * Requesting Osu API
   * @param {string} endpoints - Endpoints of the api
   * @param {string} query - Insert some queries including endpoints
   * @param {string} methods
   * @returns {Promise}
   * */
  #_request = (endpoints, query, methods = "GET") => {
    if(!endpoints || typeof endpoints !== "string") throw new TypeError("No endpoints specified");
    if(!query || typeof query !== "string") throw new TypeError("No query specified");

    return new Promise((resolve, reject) => {
      axios({
        url: `${this.baseURL}${endpoints}?k=${this.#token}${query}`,
        method: methods
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
	* Get User Data
	* @param {string} name - User id or name
	* @param {string} mode - Ingame modes
	* @returns {Promise}
	* */
  getUser(name, mode = "standard") {
    if(!name || typeof name !== "string") throw new TypeError("No username specified");
    return new Promise((resolve, reject) => {
      this.#_request("/get_user", `&u=${name}&m=${OsuGameModes[mode]}`).then((res) => {
        res.data[0]["mode"] = OsuGameModesName[mode];
        resolve(res.data[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
	* Get User Recent Playing Data
  * @param {string} name - User id or name
  * @param {string} mode - Ingame modes
  * @returns {Promise}
  * */
  getUserRecent(name, mode = "standard") {
    if(!name || typeof name !== "string") throw new TypeError("No username specified");
    return new Promise((resolve, reject) => {
      this.#_request("/get_recent_user", `&u=${name}&m=${OsuGameModes[mode]}`).then((res) => {
        res.data[0]["mode"] = OsuGameModesName[mode];
        resolve(res.data[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
	* Get User Best Performance Play Data
  * @param {string} name - User id or name
  * @param {string} mode - Ingame modes
  * @returns {Promise}
  * */
  getUserBest(name, mode = "standard") {
    if(!name || typeof name !== "string") throw new TypeError("No username specified");
    return new Promise((resolve, reject) => {
      this.#_request("/get_user_best", `&u=${name}&m=${OsuGameModes[mode]}`).then((res) => {
        res.data[0]["mode"] = OsuGameModesName[mode];
        resolve(res.data[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = OsuAPI;