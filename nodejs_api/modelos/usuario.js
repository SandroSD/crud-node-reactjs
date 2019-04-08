const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, { versionKey: false });

module.exports = mongoose.model('Usuario', usuarioSchema);