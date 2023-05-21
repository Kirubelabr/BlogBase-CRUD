const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller');
const auth = require('../../middleware/auth');
const validateUser = require('../../validations/user.validation');

router.get('/', userController.loadAll);
router.get('/:userId', auth, userController.getUserById);
router.post('/login', userController.login);

router.post('/', validateUser, userController.createUser);
router.put('/:userId', auth, validateUser, userController.updateUser);
router.put('/change-password', userController.changePassword);
router.delete('/:userId', auth, userController.deleteUser);

module.exports = router;
