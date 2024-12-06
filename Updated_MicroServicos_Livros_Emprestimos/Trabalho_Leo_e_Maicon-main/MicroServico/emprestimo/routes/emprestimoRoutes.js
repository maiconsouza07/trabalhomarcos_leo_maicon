
const express = require('express');
const emprestimoController = require('../controllers/emprestimoController');

const router = express.Router();

// Rotas para operações de empréstimos
router.post('/emprestimos', emprestimoController.registrarEmprestimo);
router.get('/emprestimos', emprestimoController.listarEmprestimos);
router.post('/emprestimos/:id/devolucao', emprestimoController.registrarDevolucao);

module.exports = router;
