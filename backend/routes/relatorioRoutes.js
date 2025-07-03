const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload'); // novo middleware do multer
const {
  createRelatorio,
  uploadRecibo,
  getRelatorios,
  getRelatorioById
} = require('../controllers/relatorioController');

// Middleware de autenticação para proteger todas as rotas
router.use(authMiddleware);

// Criar novo relatório
router.post('/', createRelatorio);

// Upload de recibo
router.post('/upload/:id', upload.single('recibo'), uploadRecibo);

// Listar todos os relatórios do usuário logado
router.get('/', getRelatorios);

// Obter relatório específico e validar assinatura
router.get('/:id', getRelatorioById);

module.exports = router;
