const Relatorio = require("../models/Relatorio");
const fs = require("fs");
const path = require("path");

// Criar relatório
exports.createRelatorio = async (req, res) => {
  try {
    const { titulo, descricao, valor, data } = req.body;
    const autor = req.user.id;

    const relatorio = new Relatorio({
      titulo,
      descricao,
      valor,
      data,
      autor,
      recibo: req.file ? req.file.filename : null,
    });

    await relatorio.save();
    res.status(201).json(relatorio);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar relatório" });
  }
};

// Upload de recibo (usado automaticamente pelo multer, incluído no create)
exports.uploadRecibo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhum arquivo enviado" });
  }
  res.json({ filename: req.file.filename });
};

// Listar relatórios
exports.getRelatorios = async (req, res) => {
  try {
    const relatorios = await Relatorio.find({ autor: req.user.id });
    res.json(relatorios);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar relatórios" });
  }
};

// Obter relatório por ID
exports.getRelatorioById = async (req, res) => {
  try {
    const relatorio = await Relatorio.findById(req.params.id);
    if (!relatorio) return res.status(404).json({ erro: "Relatório não encontrado" });
    res.json(relatorio);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar relatório" });
  }
};
