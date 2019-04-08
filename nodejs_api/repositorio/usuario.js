const User = require('../modelos/usuario');
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

module.exports = { getAll, get, post, put, deletee }