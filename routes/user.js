const userController = require('../controllers/UserController');
const router = require('express').Router();

router.get('/', userController.getAllUsers);
router.delete('/:id/delete', userController.deleteUser);
router.post('/getOneUser', userController.getOneUser);

module.exports = router;