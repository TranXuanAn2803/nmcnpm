var express = require('express');
var { engine } = require('hbs');
const path = require('path');
const bp = require("body-parser");

var LoaiDaiLy = require('./view/LoaiDaiLy/index');
var HangHoa = require('./view/HangHoa/index');

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

app.listen(3000, function() {
    console.log('listening on port 3000')
});