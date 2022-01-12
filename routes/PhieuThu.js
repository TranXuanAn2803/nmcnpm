const express = require("express");
const router = express.Router();

//set controller for router
const controller = require("../controllers/PhieuThu/PhieuThu");


router.get("/", (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.ketoan) {
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

        if (user.ketoan) {
            controller.addPhieuThu(req, res)
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

        if (user.ketoan) {
            controller.addPhieuThu(req, res)
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

        if (user.ketoan) {
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

        if (user.ketoan) {
            controller.editPhieuThu(req, res)
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

        if (user.ketoan) {
            controller.edit(req, res)
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
        if (user.ketoan) {
            controller.detailPhieuThu(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
//router.get("/add", controller.addPhieuThu);
//router.post('/add', controller.add);
//router.get('/edit/:ID', controller.editPhieuThu);
//router.post('/edit/:ID', controller.edit);

//router.get('/:ID', controller.detailPhieuThu);

/*router.get("/add", controller.addDaiLy);
router.post('/add', controller.add);
router.get('/edit/:ID', controller.editDaiLy);
router.post('/edit/:ID', controller.edit);
router.get('/delete/:ID', controller.deleteDaiLy);

router.get('/:ID', controller.detailDaiLy);

router.get("/addAccount", controller.addAccount);
router.post('/addAccount', controller.add);
router.get('/edit/:id', controller.editAccount);
router.post('/edit/:id', controller.edit);
router.get('/delete/:id', controller.deleteAccount);

router.get('/:id', controller.detailUser);
*/
module.exports = router;