const db = require("../connections/database");
const _ = require("lodash");
exports.spacificeTime = async (at, kioskid) => {
  return new Promise(async (resolve, reject) => {
    const data = await db.query(
      ` SELECT name,kioskId,bikesAvailable,docksAvailable,totalDocks,temperature,feelsLike,description FROM weather INNER JOIN bikeStaion ON weather.id= bikeStaion.weatherId WHERE bikeStaion.createdAT=$1 AND kioskid=$2`,
      [at, kioskid]
    );
    if (data.rows.length != 0) {
      resolve(data);
    } else {
      reject("not found");
    }
  });
};

exports.inRange = async (from, to, kioskid) => {
  return new Promise(async (resolve, reject) => {
    const data = await db.query(
      "SELECT * FROM bikeStaion WHERE createdAT BETWEEN $1 AND $2 AND kioskid=$3",
      [from, to, kioskid]
    );
    if (data.rows.length != 0) {
      resolve(data);
    } else {
      reject("not found");
    }
  });
};

exports.hourly = async (data) => {
  var filterdData = _.remove(data, function (station) {
    return (
      station.createdat.getMinutes() == 0 && station.createdat.getSeconds() == 0
    );
  });
  return filterdData;
};

exports.daily = async (data) => {
  var filterdData = _.remove(data, function (station) {
    return (
      station.createdat.getHours() >= 12 && station.createdat.getHours() <= 17
    );
  });
  return filterdData;
};
