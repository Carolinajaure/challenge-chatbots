const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  nombreCliente: { type: String, required: true },
  items: [
    {
      nombre: String,
      precio: Number,
      cantidad: Number,
      subtotal: Number,

    },
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
},{collection: 'Pedidos'} );

module.exports = mongoose.model('Pedido', PedidoSchema);
