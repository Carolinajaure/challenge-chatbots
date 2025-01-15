# challenge-chatbots
## Instalación de Dependencias

Para instalar las dependencias necesarias, ejecuta el siguiente comando en el directorio `./challenge.js/backend`:

```bash
npm install
```

## Para correr backend:

1. Abrir el archivo `./backend/index.js`
2. Presionar `F5` 

Otra forma en la terminal:
1. Moverse al directorio `backend` con `cd .\challenge.js\backend`
2. Ejecutar el comando `node index.js`

## Endpoints Disponibles:

**GET** - `http://localhost:3001/api/chat`
- En Postman

**POST** - `http://localhost:3001/api/chat`
    - **HEADERS**: `Content-Type: application/json`
    - **BODY**:
        ```json
        {
            "message": "mostrar menú"
        }
        ```

**POST** - `http://localhost:3001/api/chat`
    - **HEADERS**: `Content-Type: application/json`
    - **BODY**:
        ```json
        {
            "message": "tomar pedido"
        }
        ```

**POST** - `http://localhost:3001/api/chat`
    - **HEADERS**: `Content-Type: application/json`
    - **BODY**:
        ```json
        {
            "message": "¿están abiertos?"
        }
        ```

## Mensajes que entiende el bot

- **mostrar menú / mostrar menu**: Muestra el menú del restaurante.
- **tomar pedido / hacer pedido / realizar pedido / pedir**: Inicia el proceso para realizar un pedido.
- **¿están abiertos? / estan abiertos? / estan abiertos / ¿estan abiertos? / están abiertos?**: Consulta si el restaurante está abierto.
- **Un número válido del menú (1, 2, etc.)**: Selecciona un producto del menú para añadirlo al pedido.
- **Un número válido para la cantidad (1, 2, etc.)**: Indica cuántas unidades de un producto quieres añadir al pedido.
- **finalizar / terminar / cancelar**: Termina el proceso de selección de productos. Si hay productos en el pedido, solicita confirmación. Si no hay productos, cancela el pedido.
- **sí / si**: Confirma el pedido y solicita el nombre del cliente.
- **no**: Cancela el pedido actual.

## Manejo de Errores

### Errores de Entrada de Usuario

- **Mensaje vacío**:
    - Si el usuario no envía ningún mensaje, el bot responde con: "El mensaje está vacío. Por favor, escribe algo."
    - Manejo: Retorna un `400 Bad Request`.

- **Cantidad inválida**:
    - Cuando se espera una cantidad (estado: `esperando_cantidad`), pero el usuario ingresa algo que no es un número válido o un número menor o igual a cero, el bot responde con: "Por favor, ingresa una cantidad válida (número mayor a 0)."

- **Opción de menú inválida**:
    - Si el usuario selecciona una opción fuera del rango del menú o no ingresa un número cuando se espera uno (estado: `esperando_seleccion`), el bot responde con: "Opción inválida. Por favor, selecciona un número del menú o escribe 'finalizar'."

- **Respuesta inválida al confirmar el pedido**:
    - Si el usuario no responde con "sí" o "no" cuando se le pide confirmar el pedido, el bot responde con: "Por favor, responde 'sí' para confirmar o 'no' para cancelar el pedido."

- **Mensaje desconocido**:
    - Si el mensaje no coincide con ninguno de los comandos esperados o palabras clave, el bot responde con: "No entiendo ese mensaje. ¿Puedes intentarlo de otra manera?"

### Errores en la lógica del flujo

- **Cancelar sin productos seleccionados**:
    - Si el usuario intenta finalizar el pedido (finalizar/terminar/cancelar) sin haber añadido ningún producto, el bot responde con: "No has añadido ningún producto. Pedido cancelado."
    - Luego, limpia el estado del usuario.

### Errores del servidor

**Errores generales de procesamiento**:
- Si ocurre algún error inesperado en el código del servidor, el bot responde con: "Hubo un error procesando tu solicitud. Por favor, inténtalo más tarde."
- Esto está gestionado en el bloque `catch` global de la ruta principal `/chat`.

**Errores al guardar en la base de datos**:
- Si ocurre un error al guardar el pedido (`await nuevoPedido.save()`), el `catch` global manejará el error y enviará la respuesta estándar de error del servidor.

### Errores relacionados con la consulta de datos

**Problemas al cargar el menú**:
- Si alguna de las consultas al menú (`Entrada.find()`, `Gohan.find()`, etc.) falla, se manejará mediante el bloque `catch` global.