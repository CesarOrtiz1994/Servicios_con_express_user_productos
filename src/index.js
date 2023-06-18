require('@babel/register');
//Inicializar Express
const express = require('express');
//Creamos constante para mongoose
const mongoose = require('mongoose');
//importar dotenv
require('dotenv').config();
//crear constante para ruta de usuario
const userRoutes = require('./routes/user');
const productoRoutes = require('./routes/productos');

const { getCredentials, getToken } = require("./utils/headers.js");
const { signToken, verifyToken, validateExpiration } = require("./utils/token.js");
const { getUser } = require("./utils/users.js");
//crear app que ejecuta express
const app = express();
//crear la constante del puerto
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', productoRoutes);

app.post('/token', (req, res) => {
    try {
        const { username, password } = getCredentials(req);
        const user = getUser(username, password);
        const token = signToken(user);

        res.send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/private", (req, res) => {
    try {
      const token = getToken(req);
      const payload = verifyToken(token);
  
      validateExpiration(payload);
  
      res.send("Soy un EndPoint privado");
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });
  
//conexion a la base de datos
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Conexion a la base de datos de atlas establecida');
}).catch((error) => {
    console.log('Error al conectar a la base de datos de atlas', error);
});

//ruta Home -> Respuesta
app.get('/', (req, res) => {
    res.send('Hola desde mi chompu');
});

//Inicializar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
});