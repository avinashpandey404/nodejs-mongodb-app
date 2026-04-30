const express = require('express');
const router = express.Router();
const c = require('../controllers/itemController');
const auth = require('../middleware/auth');
const { validateItem } = require('../middleware/validate');

router.get('/', auth, c.getItems);
router.post('/', auth, validateItem, c.createItem);

module.exports = router;
