// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const verificarToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/data', verificarToken, authController.getData);
router.post('/data', verificarToken, authorizeRoles('admin'), authController.createData);
router.put('/data', verificarToken, authorizeRoles('editor', 'admin'), authController.updateData);
router.delete('/data', verificarToken, authorizeRoles('admin'), authController.deleteData);

module.exports = router;
