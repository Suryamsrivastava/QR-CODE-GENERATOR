const express = require("express");
const path = require("path");
const URL = require("./models/url.model")
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly, checkAuth}= require("./middlewares/auth.middleware");
const mongoose = require("mongoose")
const urlRoute = require("./routes/url.route");
const staticRoute = require("./routes/static.route");
const userRoute = require("./routes/user.route");
const connectDB = require("./config/db");
const methodOverride = require("method-override");


const app = express();
const PORT = 8000;
connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(methodOverride("_method"));


app.get("/test", async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {urls: allUrls});
})

app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, 'public')));
        

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})