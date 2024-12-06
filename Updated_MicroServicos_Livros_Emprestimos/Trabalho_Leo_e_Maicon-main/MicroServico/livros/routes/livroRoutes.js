
const express = require('express');
const livroController = require('../controllers/livroController');

const router = express.Router();

// Rotas para operações de livro
router.post('/livros', livroController.cadastrarLivro);
router.get('/livros', livroController.listarLivros);
router.get('/livros/:id', livroController.buscarLivroPorId);
router.patch('/livros/:id', livroController.atualizarDisponibilidade);

module.exports = router;
