/*
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss')
const { fetchISSFlyOverTimes } = require('./iss')
*/
const { nextISSTimesForMyLocation } = require('./iss');


/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  return ip;
});


fetchCoordsByIP("23.16.245.181", (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  return coords;
});

fetchISSFlyOverTimes({lat: '49', lon: '-120'}, (error, flyOvers) => {

  if(error) {
    console.log("It didn't work", error);
    return;
  }
  return flyOvers;
});
*/

nextISSTimesForMyLocation((error, flyOvers) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const flyOver of flyOvers) {
    const passTime = new Date(0)
    passTime.setUTCSeconds(flyOver.risetime)
    console.log(`Next pass at ${passTime} for ${flyOver.duration} seconds!`);
  }
  // success, print out the deets!
   

});