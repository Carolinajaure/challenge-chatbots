const express = require('express');
const { Entrada, Gohan, Roll, Combo } = require('../modelos/menu');
const Pedido = require('../modelos/pedidos');

const router = express.Router();

const estados = {}; // Para almacenar estados temporales de los usuarios

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const userId = req.ip;
  const lowerMessage = message.toLowerCase();

  try {
    if (!message) {
      return res.status(400).json({ reply: 'El mensaje está vacío. Por favor, escribe algo.' });
    }
    
    
    if (estados[userId]) {
      const userState = estados[userId];

      // Si el usuario está seleccionando la cantidad de un producto
      if (userState.estado === 'esperando_cantidad') {
        const cantidad = parseInt(lowerMessage, 10);

        if (!isNaN(cantidad) && cantidad > 0) {
          // Calcular subtotal
          const itemSeleccionado = userState.menu[userState.productoSeleccionado];
          const subtotal = itemSeleccionado.precio * cantidad;

          // Añadir el producto con la cantidad y subtotal al pedido
          userState.pedido.push({
            nombre: itemSeleccionado.nombre,
            precio: itemSeleccionado.precio,
            cantidad,
            subtotal,
          });

          userState.estado = 'esperando_seleccion'; // Volver al estado de selección
          return res.json({
            reply: `Añadido: ${itemSeleccionado.nombre} x${cantidad} (Subtotal: $${subtotal}). ¿Quieres añadir más? Responde con otro número o escribe "finalizar".`,
          });
        } else {
          return res.json({ reply: 'Por favor, ingresa una cantidad válida (número mayor a 0).' });
        }
      }

      // Si el usuario está seleccionando productos
      if (userState.estado === 'esperando_seleccion') {
        const opcion = parseInt(lowerMessage, 10);

        if (!isNaN(opcion) && opcion > 0 && opcion <= userState.menu.length) {
          userState.productoSeleccionado = opcion - 1;
          userState.estado = 'esperando_cantidad';
          const item = userState.menu[userState.productoSeleccionado];
          return res.json({ reply: `¿Cuántas unidades de ${item.nombre} deseas?` });
        } else if (lowerMessage === 'finalizar' || lowerMessage === 'terminar' || lowerMessage === 'cancelar') {
          if (userState.pedido.length === 0) {
            delete estados[userId]; // Limpiar estado
            return res.json({ reply: 'No has añadido ningún producto. Pedido cancelado.' });
          }

          // Mostrar los detalles del pedido y pedir confirmación
          let detallesPedido = 'Tu pedido actual:<br>';
          userState.pedido.forEach((item, index) => {
            detallesPedido += `${index + 1}. ${item.nombre} x${item.cantidad} - $${item.subtotal} (c/u $${item.precio})<br>`;
          });

          const total = userState.pedido.reduce((sum, item) => sum + item.subtotal, 0);
          detallesPedido += `<br>Total: $${total}<br><br>¿Confirmas tu pedido? Responde "sí" para confirmar o "no" para cancelar.`;

          userState.estado = 'esperando_confirmacion';
          return res.json({ reply: detallesPedido });
        } else {
          return res.json({ reply: 'Opción inválida. Por favor, selecciona un número del menú o escribe "finalizar".' });
        }
      }

      // Si el usuario está confirmando el pedido
      if (userState.estado === 'esperando_confirmacion') {
        if (lowerMessage === 'sí' || lowerMessage === 'si') {
          userState.estado = 'esperando_nombre';
          return res.json({ reply: 'Por favor, escribe tu nombre para completar el pedido.' });
        } else if (lowerMessage === 'no') {
          delete estados[userId]; // Limpiar estado
          return res.json({ reply: 'Pedido cancelado. ¡Esperamos que vuelvas pronto!' });
        } else {
          return res.json({ reply: 'Por favor, responde "sí" para confirmar o "no" para cancelar el pedido.' });
        }
      }

      // Si el usuario está proporcionando su nombre
      if (userState.estado === 'esperando_nombre') {
        userState.nombreCliente = message;

        // Calcular el total del pedido
        const total = userState.pedido.reduce((sum, item) => sum + item.subtotal, 0);

        // Guardar el pedido en la base de datos
        const nuevoPedido = new Pedido({
          nombreCliente: userState.nombreCliente,
          items: userState.pedido,
          total,
        });

        await nuevoPedido.save();

        delete estados[userId]; // Limpiar estado

        return res.json({ reply: `¡Gracias, ${message}! Tu pedido ha sido registrado. El total es $${total}.` });
      }
    }

    // Mostrar menú
    if (lowerMessage === 'mostrar menú' || lowerMessage === 'mostrar menu') {
      const entradas = await Entrada.find();
      const gohan = await Gohan.find();
      const rolls = await Roll.find();
      const combos = await Combo.find();

      let responseText = 'Aquí tienes nuestro menú:<br><br>';

      
      if (entradas.length > 0) {
        responseText += 'ENTRADAS:<br>';
        entradas.forEach(item => {
          responseText += `- ${item.nombre}: $${item.precio}<br>`;
        });
        responseText += '<br>';
      } else {
        responseText += 'No hay entradas disponibles.<br><br>';
      }

      
      if (gohan.length > 0) {
        responseText += 'GOHAN:<br>';
        gohan.forEach(item => {
          responseText += `- ${item.nombre}: $${item.precio}<br>`;
        });
        responseText += '<br>';
      } else {
        responseText += 'No hay opciones de gohan disponibles.<br><br>';
      }

      
      if (rolls.length > 0) {
        responseText += 'ROLLS:<br>';
        rolls.forEach(item => {
          responseText += `- ${item.nombre}: $${item.precio}<br>` ;
        });
        responseText += '<br>';
      } else {
        responseText += 'No hay rolls disponibles.<br><br>';
      }

      
      if (combos.length > 0) {
        responseText += 'COMBOS:<br>';
        combos.forEach(item => {
          responseText += `- ${item.nombre}: $${item.precio}<br>`;
        });
        responseText += '<br>';
      } else {
        responseText += 'No hay combos disponibles.<br><br>';
      }

      
      
       return res.send({ reply: responseText });
      }
      
    // Verificar si están abiertos
    if (lowerMessage === '¿están abiertos?'  || lowerMessage === 'estan abiertos?' || lowerMessage === 'estan abiertos' || lowerMessage === '¿estan abiertos?' || lowerMessage === 'están abiertos?') {
      const currentHour = new Date().getHours();
      const currentDay = new Date().getDay();
      const isOpen = (currentDay >= 1 && currentDay <= 6) && ((currentHour >= 11 && currentHour < 15) || (currentHour >= 19 || currentHour < 1));
      return res.json({ reply: isOpen ? '¡Sí, estamos abiertos!' : 'Lo siento, estamos cerrados. Nuestro horario es de lunes a sabados de 11 a.m - 15 p.m y de 19 p.m - 01 a.m' });
    }

    // Iniciar un pedido
    if (lowerMessage === 'tomar pedido' || lowerMessage === 'hacer pedido' || lowerMessage === 'realizar pedido' || lowerMessage === 'pedir') {
      const entradas = await Entrada.find();
      const gohan = await Gohan.find();
      const rolls = await Roll.find();
      const combos = await Combo.find();

      const menu = [
        ...entradas.map((item) => ({ ...item.toObject(), categoria: 'Entrada' })),
        ...gohan.map((item) => ({ ...item.toObject(), categoria: 'Gohan' })),
        ...rolls.map((item) => ({ ...item.toObject(), categoria: 'Roll' })),
        ...combos.map((item) => ({ ...item.toObject(), categoria: 'Combo' })),
      ];

      estados[userId] = {
        estado: 'esperando_seleccion',
        menu,
        pedido: [],
      };

      let responseText = 'Por favor, selecciona un número del menú para añadir al pedido:<br>';
      menu.forEach((item, index) => {
        responseText += `${index + 1}. ${item.nombre} - $${item.precio} (${item.categoria})<br>`;
      });

      return res.json({ reply: responseText });
    }

    // Respuesta por defecto
    res.json({ reply: 'No entiendo ese mensaje. ¿Puedes intentarlo de otra manera?' });
  } catch (error) {
    console.error('Error en el chatbot:', error);
    res.status(500).json({ reply: 'Hubo un error procesando tu solicitud. Por favor, inténtalo más tarde.' });
  }
});
router.post('/reset', (req, res) => {
  const userId = req.ip; 
  delete estados[userId]; // Limpia el estado del usuario
  return res.json({ message: 'Estado reiniciado exitosamente.' });
});

//Mensaje de bienvenida
router.get('/chat', (req, res) => {
   return res.json({reply: 'Bienvenido al chatbot de Sakura Sushi Bar. Puedes escribir "mostrar menú" para ver el menú o "tomar pedido" para iniciar un pedido. También puedes preguntarme ¿están abiertos?' });
});



module.exports = router;
