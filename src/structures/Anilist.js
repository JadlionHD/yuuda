const axios = require("axios");
const baseURL = "https://graphql.anilist.co";

module.exports = class anilist {
	static searchAnime(name) {
		return new Promise(function(resolve, reject) {
			axios({
				url: baseURL,
				method: "post",
				data: {
					query: `
query {
  Media (search: "${name}", type: ANIME) {
    id
    episodes
    type
    description(asHtml: false)
    averageScore
    duration
    source
    status
    popularity
    isAdult
    favourites
    bannerImage
    coverImage {
      large
    }
    title {
      romaji
      native
      userPreferred
    }
    genres
    startDate {
      year
      month
      day
    }
  }
}
`
				}
			}).then(result => {
				resolve(result.data)
			}).catch(err => {
				reject(err.data)
			})
		})
	}

	static searchCharacter(name) {
		return new Promise(function(resolve, reject) {
			axios({
				url: baseURL,
				method: "post",
				data: {
					query: `
query {
  Character (search: "${name}") {
    name {
      first
      last
      full
      native
    }
    image {
      large
      medium
    }
    description
    siteUrl
  }
}
`
				}
			}).then(result => {
				resolve(result.data)
			}).catch(err => {
				reject(err.data)
			})	
		})
	}
}