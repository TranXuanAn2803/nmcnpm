var express = require("express");
var router = express.Router();
const controller = require('../controllers/login/login');
const passport = require('../controllers/login/passport-config');

router.get('/', (req, res) => {
    if (controller.isAuthenticated(req, res)) {
        res.redirect('/')
    }
    controller.login(req, res)

});

router.post('/', passport.authenticate("local", {

        failureFlash: true,
    }),
    function(req, res) {
        if (req.user) {
            id = req.user.id
            req.session.user = {
                giamdoc: false,
                ketoan: false,
                quankho: false,
                quanly: false,
                daily: false,
            }
            if (req.user.role == "giamdoc") {
                req.session.user.giamdoc = true
            }
            if (req.user.role == "ketoan") {
                req.session.user.ketoan = true
            }
            if (req.user.role == "quankho") {
                req.session.user.quankho = true
            }
            if (req.user.role == "quanly") {
                req.session.user.quanly = true
            }
            if (req.user.role == "daily") {
                req.session.user.daily = true
            }

            res.redirect('/')
        } else {
            res.redirect('/login')

        }
    }

);


module.exports = router;