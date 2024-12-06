
const Emprestimo = require('../models/emprestimo');
const axios = require('axios');

// Registrar um novo empréstimo
exports.registrarEmprestimo = async (req, res) => {
  try {
    const { usuarioId, livroId } = req.body;

    // Verificar se o livro está disponível
    const livroResponse = await axios.get(`http://localhost:3001/livros/${livroId}`);
    if (!livroResponse.data.disponivel) {
      return res.status(400).json({ error: 'Livro não está disponível.' });
    }

    // Verificar se o usuário existe
    const usuarioResponse = await axios.get(`http://localhost:3000/usuarios/${usuarioId}`);
    if (!usuarioResponse.data) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Registrar o empréstimo
    const novoEmprestimo = await Emprestimo.create({ usuarioId, livroId });
    
    // Atualizar a disponibilidade do livro para "não disponível"
    await axios.patch(`http://localhost:3001/livros/${livroId}`, { disponivel: false });

    res.status(201).json(novoEmprestimo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar empréstimo.' });
  }
};

// Listar todos os empréstimos
exports.listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll();
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar empréstimos.' });
  }
};

// Registrar devolução de um livro
exports.registrarDevolucao = async (req, res) => {
  try {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
      return res.status(404).json({ error: 'Empréstimo não encontrado.' });
    }

    emprestimo.dataDevolucao = new Date();
    await emprestimo.save();

    // Atualizar a disponibilidade do livro para "disponível"
    await axios.patch(`http://localhost:3001/livros/${emprestimo.livroId}`, { disponivel: true });

    res.status(200).json(emprestimo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar devolução.' });
  }
};
