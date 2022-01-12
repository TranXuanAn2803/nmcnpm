const express = require("express");
const router = express.Router();

//set controller for router
const controller = require("../controllers/DaiLy/DaiLy");

router.get("/", (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.giamdoc || user.quanly || user.daily) {
            controller.list(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.get("/add", (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quanly) {
            controller.addDaiLy(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.post("/add", (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quanly) {
            controller.add(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.get('/edit/:ID', (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quanly) {
            controller.editDaiLy(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.post('/edit/:ID', (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quanly) {
            controller.edit(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.get('/delete/:ID', (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quanly) {
            controller.deleteDaiLy(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.get('/:ID', (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.giamdoc || user.quanly) {
            controller.detailDaiLy(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});


/*router.get("/addAccount", controller.addAccount);
router.post('/addAccount', controller.add);
router.get('/edit/:id', controller.editAccount);
router.post('/edit/:id', controller.edit);
router.get('/delete/:id', controller.deleteAccount);

router.get('/:id', controller.detailUser);
*/
module.exports = router;