const express = require("express");
const router = express.Router();
const MainRoutes = require("../controllers/mainController");

router.get("/stations", MainRoutes.AllStaions);

router.get("/stations/:kioskid", MainRoutes.getStaion);

module.exports = router;
