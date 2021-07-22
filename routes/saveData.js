const express = require("express");
const { saveData } = require("../controllers/saveData");
const router = express.Router();

router.post("/save-data", saveData);

module.exports = router;
