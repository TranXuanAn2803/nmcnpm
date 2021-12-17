const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router()
const HangHoa = require('../../controller/HangHoa.controller');

router.get('/', function(req, res, next) {
    res.render('HangHoa/HangHoa');

});



router.post('/add', HangHoa.createHangHoa);
router.get('/:id', HangHoa.getHangHoaById);
router.post('/update', HangHoa.updateHangHoa);
router.post('/delete', HangHoa.deleteHangHoa);
//router.post('/all', );




module.exports = router