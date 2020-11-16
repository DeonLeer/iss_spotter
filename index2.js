const { nextISSTimesForMyLocation } = require('./iss_promised2');

nextISSTimesForMyLocation()
  .then((flyOvers) => {
    for (const flyOver of flyOvers) {
      const passTime = new Date(0)
      passTime.setUTCSeconds(flyOver.risetime)
      console.log(`Next pass at ${passTime} for ${flyOver.duration} seconds!`);
    };
  })
  .catch((error) => {
    console.log("it didnt work", error.message);
  });