const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router()
const DaiLy = require('../../controller/DaiLy.controller');

router.get('/', function(req, res, next) {
    res.render('DaiLy/DaiLy');

});



router.post('/add', DaiLy.createDaiLy);
router.get('/:id', DaiLy.getDaiLyById);
router.post('/update', DaiLy.updateDaiLy);
router.post('/delete', DaiLy.deleteDaiLy);
//router.post('/all', );




module.exports = router