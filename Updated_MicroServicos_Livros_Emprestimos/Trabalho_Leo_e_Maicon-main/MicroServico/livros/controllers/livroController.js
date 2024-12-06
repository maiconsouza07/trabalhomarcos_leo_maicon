
const Livro = require('../models/livro');

// Cadastrar um novo livro
exports.cadastrarLivro = async (req, res) => {
  try {
    const { titulo, autor } = req.body;
    const novoLivro = await Livro.create({ titulo, autor });
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar livro.' });
  }
};

// Listar todos os livros
exports.listarLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar livros.' });
  }
};

// Buscar um livro por ID
exports.buscarLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro.' });
  }
};

// Atualizar disponibilidade de um livro
exports.atualizarDisponibilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { disponivel } = req.body;
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    livro.disponivel = disponivel;
    await livro.save();
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar disponibilidade do livro.' });
  }
};
