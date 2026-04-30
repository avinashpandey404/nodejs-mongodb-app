const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

// 🔒 PROTECTED ROUTE
router.get('/', auth, itemController.getItems);

module.exports = router;
