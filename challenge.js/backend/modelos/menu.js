const mongoose = require('mongoose');

// Esquema de Entradas
const entradaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
  }, { collection: 'Entradas' });

// Esquema de Gohan
const gohanSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
}, {collection: 'Gohan'});

// Esquema de Rolls
const rollSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
}, {collection: 'Rolls'});

// Esquema de Combos
const comboSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
}, {collection: 'Combos'});

module.exports = {
  Entrada: mongoose.model('Entrada', entradaSchema),
  Gohan: mongoose.model('Gohan', gohanSchema),
  Roll: mongoose.model('Roll', rollSchema),
  Combo: mongoose.model('Combo', comboSchema),
};
