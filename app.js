const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const saveData = require("./routes/saveData");
const mainRoutes = require("./routes/mainRoutes");
app.use(express.json()); // application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/v1/", saveData);
app.use("/api/v1", mainRoutes);
app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const msg = error.message;
  res.status(status).json({ message: msg });
});
app.listen(port, () => {
  console.log("connected");
});
