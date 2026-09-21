const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Obtener todos los contactos
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('contacts').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un solo contacto por ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .find({ _id: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo contacto
const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Ocurrió un error al crear el contacto.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un contacto por ID
const updateContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .replaceOne({ _id: userId }, contact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Ocurrió un error al actualizar el contacto.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eliminar un contacto por ID
const deleteContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Ocurrió un error al eliminar el contacto.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};