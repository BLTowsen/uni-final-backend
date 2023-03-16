const request = require('request');

const MUSICBRAINZ_API_URL = 'https://musicbrainz.org/ws/2';

module.exports = {
    getArtistInfo : async (name) => {
        const query = encodeURIComponent(name);
        const url = `${MUSICBRAINZ_API_URL}/artist?query=${query}&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };
        console.log(url);
        return new Promise((resolve, reject) => {
          request.get(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
              const data = body;
              if (data.artists.length > 0) {
                resolve(data.artists[0]);
              } else {
                reject('No artist found');
              }
            } else {
              reject(error);
            }
          });
        });
    },
    getArtistReleases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/release?artist=${mbid}&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };
        console.log(url);
        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data.releases.length > 0) {
                    resolve(data.releases);
                } else {
                    reject('No releases found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getReleaseInfo : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/release/${mbid}?fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };
        
        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No release found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getReleaseTracks : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/recording?release=${mbid}&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data.recordings.length > 0) {
                    resolve(data.recordings);
                } else {
                    reject('No tracks found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getTrackInfo : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/recording/${mbid}?fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No track found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getTrackCredits : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/recording/${mbid}/?inc=artists&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No credits found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getTrackReleases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/recording/${mbid}/?inc=releases&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No releases found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getTrackWork : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/recording/${mbid}/?inc=work-rels&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No work found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkInfo : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}?fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No work found');
                }
                } else {
                reject(error);
                }
            });
        }
    },
    getWorkReleases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=releases&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No releases found');
                }
                } else {
                reject(error);
                }
            });
        }
    },
    getWorkRecordings : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=recordings&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No recordings found');
                }
                } else {
                reject(error);
                }
            });
        }
    },
    getWorkArtists : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=artists&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No artists found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkAliases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=aliases&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No aliases found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkTags : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=tags&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No tags found');
                }
                } else {
                reject(error);
                }
            });
        }
    },
    getWorkRatings : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=ratings&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No ratings found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkUserRatings : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=user-ratings&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No user ratings found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkUserTags : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=user-tags&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No user tags found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkIswcs : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=iswcs&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {   
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No iswcs found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkRelations : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=relations&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No relations found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkReleases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=releases&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No releases found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkDiscids : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=discids&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No discids found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkAliases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=aliases&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No aliases found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkTags : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=tags&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No tags found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkRatings : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=ratings&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No ratings found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkUserRatings : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=user-ratings&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No user ratings found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkUserTags : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=user-tags&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No user tags found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkIswcs : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=iswcs&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No iswcs found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkArtists : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=artists&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No artists found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkReleases : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=releases&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No releases found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    getWorkDiscids : async (mbid) => {
        const url = `${MUSICBRAINZ_API_URL}/work/${mbid}/?inc=discids&fmt=json`;
        const options = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'MusicBrainzUniProject/1.0 (lawrancetowsen@gmail.com)'
            }
        };

        return new Promise((resolve, reject) => {  
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                const data = body;
                if (data) {
                    resolve(data);
                } else {
                    reject('No discids found');
                }
                } else {
                reject(error);
                }
            });
        });
    },
    
}