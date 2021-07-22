const db = require("../connections/database");
const {
  inRange,
  spacificeTime,
  hourly,
  daily,
} = require("../helpers/getStations");
exports.AllStaions = async (req, res, next) => {
  const time = req.query.at;
  try {
    const data = await db.query(
      `SELECT name,kioskId,bikesAvailable,docksAvailable,totalDocks,temperature,feelsLike,description FROM weather INNER JOIN bikeStaion ON weather.id= bikeStaion.weatherId WHERE bikeStaion.createdAT=$1`,
      [time]
    );
    if (data.rows.length == 0) {
      const error = new Error("no suitable data is available");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ at: time, stationsAndweather: data.rows });
  } catch (err) {
    next(err);
  }
};

exports.getStaion = async (req, res, next) => {
  const kioskid = req.params.kioskid;
  const at = req.query.at;
  const from = req.query.from;
  const to = req.query.to;
  const freq = req.query.frequency === "daily" ? "daily" : "hourly";
  let preparedData;

  try {
    if (at) {
      preparedData = await spacificeTime(at, kioskid);
      preparedData = preparedData.rows;
    } else if (to && from) {
      const data = await inRange(from, to, kioskid);
      if (freq === "hourly") {
        preparedData = await hourly(data.rows);
      } else {
        preparedData = await daily(data.rows);
      }
    }
    if (preparedData.length == 0) {
      throw new Error("not found 404");
    }
    res.status(200).json({ at, stationData: preparedData });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 404;
    next(error);
  }
};
