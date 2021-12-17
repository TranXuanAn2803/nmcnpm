const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router()
const LoaiDaiLy = require('../../controller/LoaiDaiLy.controller');

router.get('/', function(req, res, next) {
    res.render('LoaiDaiLy/LoaiDaiLy');

});


router.post('/add', LoaiDaiLy.createLoaiDaiLy);
router.get('/:id', LoaiDaiLy.getLoaiDaiLyById);
router.post('/update', LoaiDaiLy.updateLoaiDaiLy);
router.post('/delete', LoaiDaiLy.deleteLoaiDaiLy);





module.exports = router