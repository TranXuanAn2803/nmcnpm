const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router()
const CT_PhieuXuat = require('../../controller/CT_PhieuXuat.controller');

router.get('/:id', function(req, res, next) {
    res.render('CT_PhieuXuat/CT_PhieuXuat', { id: req.params.id });

});



router.post('/add', CT_PhieuXuat.createCT_PhieuXuat);
router.post('/update', CT_PhieuXuat.updateCT_PhieuXuat);
router.post('/delete', CT_PhieuXuat.deleteCT_PhieuXuat);
//router.post('/all', );




module.exports = router