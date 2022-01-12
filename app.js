const express = require("express");
const cors = require("cors");
const pool = require("./config/db.config");
const hbs = require("hbs");
const path = require("path");
const flash = require("connect-flash");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();

app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
//routes
/*const patient = require("./routes/patients");
const product = require("./routes/products");
const package = require("./routes/package");
const userAccount = require("./routes/account");
const login = require("./routes/login");
const user = require("./routes/user");
*/
const LoaiDaiLy = require("./routes/LoaiDaiLy");
const DaiLy = require("./routes/DaiLy");
const PhieuThu = require("./routes/PhieuThu");
const PhieuXuat = require("./routes/PhieuXuat");
const CT_PhieuXuat = require("./routes/CT_PhieuXuat");
const HangHoa = require("./routes/HangHoa");
const login = require("./routes/login");

//hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(__dirname + "/views/partials", function(err) {});

//cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//database
const { QueryTypes } = require("sequelize");
const { models } = require("./models");
const sq = require("./models/index");
sq.sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

//set routes for server
/*app.use("/patient", patient);
app.use("/product", product);
app.use("/account", userAccount);
app.use("/login", login);
app.use("/package", package);
app.use("/user", user);

app.use("/", (req, res) => {
    res.render("manager/managerDashboard", {
        tag: "Patient",
    });
});
*/

app.use("/LoaiDaiLy", LoaiDaiLy);
app.use("/DaiLy", DaiLy);
app.use("/PhieuThu", PhieuThu);
app.use("/PhieuXuat", PhieuXuat);
app.use("/CT_PhieuXuat", CT_PhieuXuat);
app.use("/HangHoa", HangHoa);
app.use("/login", login);

app.use("/", (req, res) => {
    res.render("main", {
        tag: "Trang Chủ",
    });
});

//do not change
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port " + port));