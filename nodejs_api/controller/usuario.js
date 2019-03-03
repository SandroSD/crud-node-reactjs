//It will contain all of my user related routes.
const { check, validationResult } = require('express-validator/check');
const usuarioRepositorio = require('../repositorio/usuario');
const showError = require('../extras/errors/showErrors');

const express = require('express');
const users = express.Router();
const Usuario = require('../modelos/usuario');

/*users.post("/test", [
	check('first_name').isLength({ min: 5}).withMessage("El first_name debe tener mínimo 5 caracteres"),
	check('last_name').isLength({ min: 7}).withMessage("El last_name debe tener mínimo 7 caracteres")
], (req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).json({ errors: errors.array()});
	}
	let user = new Usuario({
		id: req.params.id ? req.params.id : null,
		first_name : req.body.first_name ? req.body.first_name : null,
		last_name : req.body.last_name ? req.body.last_name : null,
		address: {
			id: null,
			street: req.body.street ? req.body.street : null,
			number: req.body.number ? req.body.number : null,
			zipCode: req.body.zipCode ? req.body.zipCode : null
		}
	});
	res.status(200).json({user: user});
});*/

users.get("/users", (req, res) => {
	usuarioRepositorio.getAll(function(result){
		res.status(result.status).json(result.data);
	});
});

users.get("/user/:id", (req, res) => {
	usuarioRepositorio.get(req.params.id, function(result){
		if(result.status === 204){
			res.sendStatus(result.status);
			res.end();
		}else{
			res.status(result.status).json(result.data);
		}
	});
});

users.post('/user', [
	check('nombre')
		.isString().withMessage("El nombre debe contener solo letras")
		.isLength({
			min: 1,
			max: 15
		}).withMessage("El nombre debe tener una longitud de por lo menos 1 caracter y máximo 15"),
	check('apellido')
		.isString().withMessage("El apellido debe contener solo letras")
		.isLength({
			min: 1,
			max: 20
		}).withMessage("El apellido debe tener una longitud de por lo menos 1 caracter y máximo 20"),
	check('mail')
		.isEmail().withMessage("El mail no es correcto")
		.isLength({
			max: 25
		}).withMessage("El mail debe tener una longitud máxima de 25 caracteres"),
	check('celular')
		.isNumeric().withMessage("El celular debe contener solamente números"),
	check('fechaNacimiento')
		.toDate().withMessage("La fecha no es correcta"),
	check('calle')
		.isAlpha().withMessage("La calle debe tener solo letras")
		.isString().withMessage("La calle debe tener solo letras")
		.isLength({
			min: 1,
			max: 10
		}).withMessage("La calle debe contener minimo 1 caracter y máximo 30"),
	check('numero')
		.isNumeric().withMessage("El número no puede contener letras")
		.isLength({
			min: 1,
			max: 5
		}).withMessage("El número debe tener mínimo un caracter"),
	check('codigoPostal')
		.isNumeric().withMessage("El código postal debe tener solo números")
		.isLength({
			min: 1
		}).withMessage("El número debe tener mínimo un caracter")
], (req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		showError(errors.array(), function(result){
			return res.status(422).json({msg: result});
		});
	}
	let user = getData(req.body);
	return res.json({user: user});
	/*usuarioRepositorio.post(user, function(result){
		res.status(result.status).json(result.data);
	});*/
});

users.put('/user/:id', (req, res) => {
	let user = getData(req);
	usuarioRepositorio.put(user, function(result){
		res.status(result.status);
		res.end();
	});
});

users.delete('/user/:id', (req, res) => {
	usuarioRepositorio.deletee(req.params.id, function(result){
		res.status(result.status);
		res.end();
	});
});

getData = (body) => {
	let user = new Usuario({
		id: body.id,
		nombre : body.nombre,
		apellido : body.apellido,
		mail: body.mail,
		celular: body.celular,
		fechaNacimiento: body.fechaNacimiento,
		direccion: {
			calle: body.calle,
			numero: body.numero,
			codigoPostal: body.codigoPostal
		}
	});
	return user;
}

module.exports = users;