const express = require('express');
const recordController = require('../controllers/recordController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');
const {ROLES} = require('../constants/authConstants');

const router = express.Router();

router.use(authMiddleware);

router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.ANALYST), recordController.getAllRecords);
router.post('/', authorizeRoles(ROLES.ADMIN), recordController.createRecord);
router.put('/:id', authorizeRoles(ROLES.ADMIN), recordController.updateRecord);
router.delete('/:id', authorizeRoles(ROLES.ADMIN), recordController.deleteRecord);

module.exports = router;