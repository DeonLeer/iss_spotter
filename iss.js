const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } 
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const ip = data["ip"];
    callback(null, ip);
  })
}

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
      callback(Error(msg), null);
      return;
    }

    const lat = JSON.parse(body).lat;
    const lon = JSON.parse(body).lon;

    callback(null, { lat, lon });
  });
}

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode != 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times: ${body}`
      callBack(Error(msg), null);
      return;
    }

  const flyOvers = JSON.parse(body).response;
  callback(null, flyOvers);
  });
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(coords, (error, flyOvers) => {
        if (error) {
          return callback(error, null)
        }
        callback(null, flyOvers);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };