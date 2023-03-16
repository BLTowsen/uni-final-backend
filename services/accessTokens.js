// export a function that returns the access token for the Spotify API using the credentials in the .env file
require('dotenv/config');
const request = require('request');

module.exports = {
    getSpotifyAccessToken: async () => {
        return new Promise((resolve, reject) => {
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
                    resolve(body.access_token);
                } else {
                    reject(error);
                }
            });
        });
    },
}