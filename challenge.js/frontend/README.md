## Instalación de Dependencias

Para instalar las dependencias necesarias, ejecuta el siguiente comando en el directorio `./challenge.js/backend`:

```bash
npm install
```

## Para ejecutar el frontend

1. En la terminal, navega al directorio `./challenge.js/frontend`.
2. Ejecuta el comando `npm start`.

## Mensajes que entiende el bot

- **mostrar menú / mostrar menu**: Muestra el menú del restaurante.
- **tomar pedido / hacer pedido / realizar pedido / pedir**: Inicia el proceso para realizar un pedido.
- **¿están abiertos? / estan abiertos? / estan abiertos / ¿estan abiertos? / están abiertos?**: Consulta si el restaurante está abierto.
- **Un número válido del menú (1, 2, etc.)**: Selecciona un producto del menú para añadirlo al pedido.
- **Un número válido para la cantidad (1, 2, etc.)**: Indica cuántas unidades de un producto quieres añadir al pedido.
- **finalizar / terminar / cancelar**: Termina el proceso de selección de productos. Si hay productos en el pedido, solicita confirmación. Si no hay productos, cancela el pedido.
- **sí / si**: Confirma el pedido y solicita el nombre del cliente.
- **no**: Cancela el pedido actual.

