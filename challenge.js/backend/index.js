const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");
const mongoose = require('mongoose');


// crear servidor
const app = express();
// Conectar a MongoDB
mongoose.connect('mongodb+srv://carojaureguialzo:atlasSUSHIDB@cluster0.vemhq.mongodb.net/mongodbVSCodePlaygroundDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

// Configurar CORS
app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
  })
);

app.use(express.json()); // para poder leer json en el body

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial TP-DDS!");
});

// Definir routers

app.use('/api', chatRouter);


app.use((req, res, next) => {
  res.status(404).send('No encontrada!');
});

// levantar servidor
if (!module.parent) { 
  const port = process.env.PORT || 3001; 
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; 


  
