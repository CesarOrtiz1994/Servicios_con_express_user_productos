const express = require("express");
//requerir el squema de usuario
const productoSchema = require("../models/productos");

const router = express.Router();

const { getCredentials, getToken } = require("../utils/headers.js");
const {
  signToken,
  verifyToken,
  validateExpiration,
} = require("../utils/token.js");

//Ruta para crear un producto
router.post("/producto", (req, res) => {
  try {
    const token = getToken(req);
    const payload = verifyToken(token);

    validateExpiration(payload);

    const producto = productoSchema(req.body);
    producto
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: error });
      });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

//Obtener todos los productos
router.get("/productos", (req, res) => {
  try {
    const token = getToken(req);
    const payload = verifyToken(token);

    validateExpiration(payload);

    productoSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

//Obtener un producto por id
router.get("/producto/:id", (req, res) => {
     try {
    const token = getToken(req);
    const payload = verifyToken(token);

    validateExpiration(payload);
        const { id } = req.params;
        productoSchema
            .findById(id)
            .then((data) => {
            res.json(data);
            })
            .catch((error) => {
            res.json({ message: error });
            });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});

//actualizar un producto por id
router.put("/producto/:id", (req, res) => {
    try {
        const token = getToken(req);
        const payload = verifyToken(token);
    
        validateExpiration(payload);
        const { id } = req.params;
        const { name, description, price } = req.body;
        productoSchema
            .updateOne({ _id: id }, { $set: { name, description, price } })
            .then((data) => {
            res.json(data);
            })
            .catch((error) => {
            res.json({ message: error });
            });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});

//eliminar un producto por id
router.delete("/producto/:id", (req, res) => {

    try {
        const token = getToken(req);
        const payload = verifyToken(token);
    
        validateExpiration(payload);
    
        const { id } = req.params;
        productoSchema
            .deleteOne({ _id: id })
            .then((data) => {
            res.json(data);
            })
            .catch((error) => {
            res.json({ message: error });
            });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});

module.exports = router;
