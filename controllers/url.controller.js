const shortid = require("shortid");
const URL = require("../models/url.model");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      message: "redirectURL is required",
    });
  }
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  

  return res.redirect("/");
}



module.exports = {
  handleGenerateNewShortURL,
}
