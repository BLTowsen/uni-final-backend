// export a function that returns the access token for the Spotify API using the credentials in the .env file
require('dotenv/config');
const request = require('request');

module.exports = {
    getAccessToken: async () => {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
              'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET_ID).toString('base64'))
            },
            form: {
              grant_type: 'client_credentials'
            },
            json: true
          };
        
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            return token;
            }
        });
    },

    getTracks : async (req, res) => {
        const token = await this.getAccessToken();
        const options = {
            url: 'https://api.spotify.com/v1/search?q=artist:' + req.params.artist + '&type=track',
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        };
        request.get(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
        });
    },

    getTrack : async (req, res) => {
        const token = await this.getAccessToken();
        const options = {
            url: 'https://api.spotify.com/v1/tracks/' + req.params.track,
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        };
        request.get(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
        });
    },

    getAlbums : async (req, res) => {
        const token = await this.getAccessToken();
        const options = {
            url: 'https://api.spotify.com/v1/search?q=artist:' + req.params.artist + '&type=album',
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        };
        request.get(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
        });
    },

    getArtist : async (req, res) => {
        const token = await this.getAccessToken();
        const options = {
            url: 'https://api.spotify.com/v1/artists/' + req.params.artist,
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        };
        request.get(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
        });
    },
}
