const getData = require("../script/getData");
const db = require("../connections/database");

exports.saveData = async (req, res, next) => {
  try {
    const weatherId = await saveWeather();
    await saveStaions(weatherId);
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

const saveWeather = async () => {
  try {
    const weather = await getData.getWeather();
    if (!weather) {
      throw new Error("error ocurred");
    }
    const description = weather["weather"][0]["description"];
    const temperature = Math.round(weather["main"]["temp"]);
    const feelsLike = Math.round(weather["main"]["feels_like"]);
    const newTodo = await db.query(
      "INSERT INTO weather(description,temperature,feelsLike) VALUES ($1,$2,$3) RETURNING id",
      [description, temperature, feelsLike]
    );

    return newTodo.rows[0].id;
  } catch (e) {}
};

const saveStaions = async (weatherId) => {
  if (!weatherId) {
    throw new Error("error ocurred");
  }
  const stations = await getData.getBikes();
  const length = stations.length;
  for (let i = 0; i < length; i++) {
    const kioskId = stations[i].properties.kioskId;
    const bikesAvailable = stations[i].properties.bikesAvailable;
    const docksAvailable = stations[i].properties.docksAvailable;
    const totalDocks = stations[i].properties.totalDocks;
    const createdAt = new Date().toISOString().split(".")[0];
    const name = stations[i].properties.name;
    const newTodo = await db.query(
      "INSERT INTO bikeStaion(name,kioskId,bikesAvailable,docksAvailable,totalDocks,weatherId,createdAT) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id",
      [
        name,
        kioskId,
        bikesAvailable,
        docksAvailable,
        totalDocks,
        weatherId,
        createdAt,
      ]
    );
  }
};
