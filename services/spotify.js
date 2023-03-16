// export a function that returns the access token for the Spotify API using the credentials in the .env file
require('dotenv/config');
const request = require('request');
const accessTokens = require('./accessTokens');

module.exports = {
    getTracks : async (artistId) => {
        return new Promise(async (resolve, reject) => {
            const token = await accessTokens.getSpotifyAccessToken();
            const options = {
                url: 'https://api.spotify.com/v1/search?q=artist:' + artistId + '&type=track',
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    },
    getTrack : async (trackId) => {
        return new Promise(async (resolve, reject) => {
            const token = await accessTokens.getSpotifyAccessToken();
            const options = {
                url: 'https://api.spotify.com/v1/tracks/' + trackId,
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    },

    getAlbums : async (artistId) => {
        return new Promise(async (resolve, reject) => {
            const token = await accessTokens.getSpotifyAccessToken();
            const options = {
                url: 'https://api.spotify.com/v1/search?q=artist:' + artistId + '&type=album',
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    },

    getArtist : async (artistId) => {
        return new Promise(async (resolve, reject) => {
            const token = await accessTokens.getSpotifyAccessToken();
            const options = {
                url: 'https://api.spotify.com/v1/artists/' + artistId,
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    },
    search : async (query) => {
        return new Promise(async (resolve, reject) => {
            const excapedQuery = query.replace(/ /g, '+');
            const token = await accessTokens.getSpotifyAccessToken();
            const options = {
                url: 'https://api.spotify.com/v1/search?q=' + excapedQuery + '&type=artist,album,track',
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    },
    searchArtist : async (query) => {
        return new Promise(async (resolve, reject) => {
            const excapedQuery = query.replace(/ /g, '+');
            const token = await accessTokens.getSpotifyAccessToken();
            const options = {
                url: 'https://api.spotify.com/v1/search?q=' + excapedQuery + '&type=artist',
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }
}
