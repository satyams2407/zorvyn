const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const {ROLES} = require('../constants/authConstants');

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles(ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER));

router.get('/summary', dashboardController.getSummary);
router.get('/recent-activity', dashboardController.getRecentActivity);
router.get('/trends', dashboardController.getTrends);

module.exports = router;