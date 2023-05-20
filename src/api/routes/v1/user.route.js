const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller');
const validateUser = require('../../validations/user.validation');

router.get('/', userController.loadAll);
router.get('/:userId', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:userId', validateUser, userController.updateUser);
router.put('/change-password', userController.changePassword);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
