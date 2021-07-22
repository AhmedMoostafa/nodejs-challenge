var request = require("request-promise");

const bikesUrl = process.env.BIKES_URL;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=philadelphia&units=metric&appid=${process.env.APPID}`;

exports.getBikes = () => {
  return new Promise((resolve, reject) => {
    request({
      url: bikesUrl,
      method: "GET",
      json: true,
    })
      .then((data) => {
        resolve(data.features);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.getWeather = () => {
  return request({
    uri: weatherUrl,
    method: "GET",
    json: true,
  })
    .then((weather) => {
      return weather;
    })
    .catch((err) => {
      return { error: err };
    });
};
