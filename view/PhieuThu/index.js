const express = require('express');
const router = express.Router()
const PhieuThu = require('../../controller/PhieuThu.controller');

router.get('/', function(req, res, next) {
    res.render('PhieuThu/PhieuThu');

});



router.post('/add', PhieuThu.createPhieuThu);
router.get('/:id', PhieuThu.getPhieuThuById);
router.post('/update', PhieuThu.updatePhieuThu);
router.post('/delete', PhieuThu.deletePhieuThu);
router.get('/find/:id', PhieuThu.find);

module.exports = router