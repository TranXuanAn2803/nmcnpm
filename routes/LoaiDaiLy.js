const express = require("express");
const router = express.Router();

//set controller for router
const controller = require("../controllers/LoaiDaiLy/LoaiDaiLy");

/*router.get("/", (req, res) => {
    controller.list(req, res)
});*/
router.get("/", (req, res) => {
    if (req.session.user) {
        user = req.session.user;

        if (user.giamdoc || user.quanly) {
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

        if (user.giamdoc) {
            controller.addLoaiDaiLy(req, res)
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

        if (user.giamdoc) {
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

        if (user.giamdoc) {
            controller.editLoaiDaiLy(req, res)
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

        if (user.giamdoc) {
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

        if (user.giamdoc) {
            controller.deleteHangHoa(req, res)
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

        if (user.giamdoc) {
            controller.detailLoaiDaiLy(req, res)
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});
//router.get("/add", controller.addLoaiDaiLy);
//router.post("/add", controller.add);
//router.get('/edit/:ID', controller.editLoaiDaiLy);
//router.post('/edit/:ID', controller.edit);

//router.get('/:ID', controller.detailLoaiDaiLy);
//router.get('/delete/:ID', controller.deleteHangHoa);


/*
router.get("/add", controller.addHangHoa);
router.post("/add", controller.add);
router.get('/:ID', controller.detailHangHoa);
router.get('/edit/:ID', controller.editHangHoa);
router.post('/edit/:ID', controller.edit);
router.get('/delete/:ID', controller.deleteHangHoa);

router.get("/addAccount", controller.addAccount);
router.post('/addAccount', controller.add);
router.get('/edit/:id', controller.editAccount);
router.post('/edit/:id', controller.edit);
router.get('/delete/:id', controller.deleteAccount);

router.get('/:id', controller.detailUser);
*/
module.exports = router;