const categoryController = require('../controllers/CategoryController');
const router = require('express').Router();

router.get('/',categoryController.getListCategory);
router.post('/insertMany', categoryController.insertMany);

module.exports = router;