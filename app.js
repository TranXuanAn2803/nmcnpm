var express = require('express');
var hbs = require('hbs');
const path = require('path');
const bp = require("body-parser");

var LoaiDaiLy = require('./view/LoaiDaiLy/index');
var HangHoa = require('./view/HangHoa/index');
var DaiLy = require('./view/DaiLy/index');
var PhieuThu = require('./view/PhieuThu/index');
var PhieuXuat = require('./view/PhieuXuat/index');
var CT_PhieuXuat = require('./view/CT_PhieuXuat/index');
hbs.registerPartials(__dirname + "/view/partials", function(err) {});

var app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname + '../public')));
/*app.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: false
}));
*/
app.use('/LoaiDaiLy', LoaiDaiLy);
app.use('/HangHoa', HangHoa);
app.use('/DaiLy', DaiLy);
app.use('/PhieuThu', PhieuThu);
app.use('/PhieuXuat', PhieuXuat);
app.use('/CT_PhieuXuat', CT_PhieuXuat);

app.listen(3000, function() {
    console.log('listening on port 3000')
});