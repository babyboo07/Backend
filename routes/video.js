const videoController = require('../controllers/VideoController');
const router = require('express').Router();

router.post('/create-video', videoController.createVideo);
router.get('/', videoController.getList);
router.get('/search',videoController.searchVideoByName);
router.get(`/seachCategory`, videoController.searchVideoByCateID);
//...

module.exports = router;