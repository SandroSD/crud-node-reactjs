const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
	id: Number,
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

module.exports = mongoose.model('Usuario',usuarioSchema);