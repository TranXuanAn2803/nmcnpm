const express = require("express");
const router = express.Router();

//set controller for router
const controller = require("../controllers/PhieuXuat/PhieuXuat");
/*router.get("/", (req, res) => {
    controller.list(req, res)

});*/
router.get("/", (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quankho || user.ketoan) {
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

        if (user.quankho) {
            controller.addPhieuXuat(req, res)
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

        if (user.quankho) {
            controller.add(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
//router.get("/add", controller.addPhieuXuat);
//router.post('/add', controller.add);
//router.get('/edit/:ID', controller.editPhieuXuat);
//router.post('/edit/:ID', controller.edit);
router.get('/edit/:ID', (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quankho) {
            controller.editPhieuXuat(req, res)
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

        if (user.quankho) {
            controller.edit(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
//router.get('/:ID', controller.detailPhieuXuat);
//router.get('/delete/:ID', controller.deletePhieuXuat);
router.get('/delete/:ID', (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.quankho) {
            controller.deletePhieuXuat(req, res)
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

        if (user.quankho) {
            controller.detailPhieuXuat(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
/*router.get("/", (req, res) => {
    controller.list(req, res)

});
router.get("/add", controller.addPhieuThu);
router.post('/add', controller.add);
router.get('/edit/:ID', controller.editPhieuThu);
router.post('/edit/:ID', controller.edit);

router.get('/:ID', controller.detailPhieuThu);

router.get("/add", controller.addDaiLy);
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