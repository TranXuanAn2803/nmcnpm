const express = require('express');
const router = express.Router()
const PhieuXuat = require('../../controller/PhieuXuat.controller');

router.get('/', function(req, res, next) {
    res.render('PhieuXuat/PhieuXuat');

});



router.post('/add', PhieuXuat.createPhieuXuat);
router.get('/:id', PhieuXuat.getPhieuXuatById);
router.post('/update', PhieuXuat.updatePhieuXuat);
router.post('/delete', PhieuXuat.deletePhieuXuat);

module.exports = router