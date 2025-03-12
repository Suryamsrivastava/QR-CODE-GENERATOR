const shortid = require("shortid");
const URL = require("../models/url.model");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "redirectURL is required" });
    }

    if (!req.user?._id) {
      console.error("User not authenticated");
      return res.status(401).json({ message: "User not authenticated" });
    }
    const lastEntry = await URL.findOne({ createdBy: req.user._id }).sort({ serialNo: -1 });
    const newSerialNo = (lastEntry?.serialNo || 0) + 1;
    const shortID = shortid.generate();
    const newURL = await URL.create({
      serialNo: newSerialNo,
      shortId: shortid.generate(),
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    console.log("Saved URL:", newURL);
    return res.status(201).json({ shortId: newURL.shortId, message: "QR Code saved successfully!" });
  } catch (error) {
    console.error("Error Saving URL:", error);
    return res.status(500).render("notification", {
      message: "Internal Server Error",
      redirectURL: "/"
    });
  }
}


async function handleDeleteURL(req, res) {
  try {
    const urlId = req.params.id;

    if (!urlId) {
      return res.status(400).redirect("/");
    }

    const urlToDelete = await URL.findOneAndDelete({ _id: urlId, createdBy: req.user._id });

    console.log("Deleted URL:", urlToDelete);
    return res.status(200).redirect("/");
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).redirect("/");
  }
}


module.exports = { handleGenerateNewShortURL, handleDeleteURL };