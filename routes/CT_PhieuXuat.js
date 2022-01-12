const express = require("express");
const { user } = require("../config/db.config");
const router = express.Router();

//set controller for router
const controller = require("../controllers/CT_PhieuXuat/CT_PhieuXuat");

router.get("/add/:ID", (req, res) => {
    if (req.session.user) {
        const user = req.session.user;

        if (user.quankho) {
            controller.addCT_PhieuXuat(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.post("/add/:ID", (req, res) => {
    if (req.session.user) {
        const user = req.session.user;

        if (user.quankho) {
            controller.add(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});

router.get('/edit/:ID/:STT', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;

        if (user.quankho) {
            controller.editCT_PhieuXuat(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.post('/edit/:ID/:STT', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;

        if (user.quankho) {
            controller.edit(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.get('/delete/:ID/:STT', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;

        if (user.quankho) {
            controller.deleteCT_PhieuXuat(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
router.get('/:ID/:STT', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;

        if (user.quankho) {
            controller.detailCT_PhieuXuat(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});

/*router.post('/add', controller.add);
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