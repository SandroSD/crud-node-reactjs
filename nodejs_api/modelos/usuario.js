const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    mail: String,
    celular: Number,
    fechaNacimiento: Date,
    direccion: {
        calle: String,
        numero: Number,
        codigoPostal: Number
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);