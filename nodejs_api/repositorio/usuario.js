const User = require('../modelos/usuario');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/";
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function getAll(callback) {
    User.find({}, function(err, result) {
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

function get(_id, callback) {
    User.findById({ _id }, function(err, result) {
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    })
}

function post(user, callback) {
    User.create(user, function(err, result) {
        if (err) {
            callback({ data: err, status: 500 });
        }
        callback({ data: user, status: 201 });
    });
}

function put(user, callback) {
    const { _id, ...userU } = user.toObject();
    User.updateOne({ _id }, userU, { new: true },
        function(err, result) {
            if (err) throw err;
            callback({ data: null, status: 204 });
        });
}

function deletee(_id, callback) {
    User.deleteOne({ _id }, function(err, result) {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

getDataFromDB = (row) => {
    const user = new User();

    user._id = row._id;
    user.nombre = row.nombre;
    user.apellido = row.apellido;
    user.mail = row.mail;
    user.celular = row.celular;
    user.fechaNacimiento = row.fechaNacimiento;
    user.direccion.calle = row.calle;
    user.direccion.numero = row.numero;
    user.direccion.codigoPostal = row.codigoPostal;

    return user;
}

module.exports = { getAll, get, post, put, deletee }