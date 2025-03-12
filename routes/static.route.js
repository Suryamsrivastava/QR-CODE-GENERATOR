const express = require("express");
const router = express.Router();
const URL = require("../models/url.model");

router.get("/", async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const allurls = await URL.find({ createdBy: req.user._id });
    const sizes = [100, 200, 300, 400];

    return res.render("home", {
      title: 'Home',
      defaultText: '',
      sizes: sizes,
      urls: allurls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/home", (req, res) => {
  return res.render("home", {title: "Home"});
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
