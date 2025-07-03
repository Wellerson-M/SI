const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const relatorioController = require('../controllers/relatorioController');

router.use(auth);

router.post('/', upload.single('recibo'), relatorioController.createRelatorio);
router.get('/', relatorioController.getRelatorios);
router.get('/:id', relatorioController.getRelatorioById);

module.exports = router;
