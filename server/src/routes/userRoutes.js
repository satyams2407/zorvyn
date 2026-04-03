
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');
const {ROLES} = require('../constants/authConstants');


const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles(ROLES.ADMIN));

router.get('/', userController.getAllUsers);
router.post('/', userController.createUserByAdmin);

module.exports = router;