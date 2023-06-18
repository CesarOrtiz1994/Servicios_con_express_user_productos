const express = require('express');
//requerir el squema de usuario
const userSchema = require('../models/user');

const router = express.Router();

//Ruta para crear un usuario
router.post('/user', (req, res) => {
    const user = userSchema(req.body)
    user.save()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({message: error})
    });

});

//Obtener todos los usuarios
router.get('/user', (req, res) => {
    userSchema.find()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({message: error})
    });
});

//Obtener un usuario por id
router.get('/user/:id', (req, res) => {
    const { id }= req.params;
    userSchema.findById(id)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({message: error})
    });
});

//actualizar un usuario por id
router.put('/user/:id', (req, res) => {
    const { id }= req.params;
    const { name, age, email } = req.body;
    userSchema.updateOne({_id: id}, {$set: {name, age, email}})
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({message: error})
    });
});

//eliminar un usuario por id
router.delete('/user/:id', (req, res) => {
    const { id }= req.params;
    userSchema.deleteOne({_id: id})
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({message: error})
    });
});

module.exports = router;