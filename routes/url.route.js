const express = require("express");
const {
  handleGenerateNewShortURL,handleDeleteURL
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.delete("/delete/:id", handleDeleteURL);
module.exports = router;
