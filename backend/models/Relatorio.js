const mongoose = require('mongoose');

const relatorioSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    hashAssinatura: String,
    dataCriacao: { type: Date, default: Date.now },
    recibo: String
});

module.exports = mongoose.model('Relatorio', relatorioSchema);
