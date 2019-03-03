const dbConn = require('../extras/db/conexion');
const User = require('../modelos/usuario');
const mongoose = require('mongoose');

function getConnection(){
	return dbConn;
}

function getAll(callback){
	let users = [];
	const connection = getConnection();
	const queryString = "SELECT * FROM usuario";
	connection.query(queryString, (err, rows, fields)=>{
		if(err){
			callback({data: err, status: 500});
		}
		if(rows){
			users = rows.map(row => {
				return getDataFromDB(row);
			});
			callback({data: users, status: 200});
		}else{
			callback({data: users, status: 200});
		}
	});
}

function get(id, callback){
	let user = "";
	const connection = getConnection();
	const queryString = "SELECT * FROM usuario WHERE id = ?";
	connection.query(queryString, [id], (err, rows, fields) => {
		if(err){
			callback({data: err, status: 500});
		}
		if(rows.length){
			user = getDataFromDB(rows[0]);
			callback({data: user, status: 200});
		}else{
			callback({data: null, status: 204});
		}
	});
}

function post(user, callback){
	const connection = getConnection();
	const queryString = "INSERT INTO usuario (nombre, apellido, mail, celular, fechaNacimiento, calle, numero, codigoPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	connection.query(queryString, [
		user.nombre,
		user.apellido,
		user.mail,
		user.celular,
		user.fechaNacimiento,
		user.direccion['calle'],
		user.direccion['numero'],
		user.direccion['codigoPostal']
	], (err, rows, fields) => {
		if(err){
			console.log("error mysql", err);
			callback({data: err, status: 500});
		}
		user.id = rows.insertId;
		callback({data: user, status: 201});
	});
}

function put(user, callback){
	const connection = getConnection();
	const queryString = "UPDATE usuario SET nombre = ?, apellido = ?, mail = ?, celular = ?, fechaNacimiento = ?, calle = ?, numero = ?, codigoPostal = ? WHERE id = ?";
	connection.query(queryString, [
		user.nombre,
		user.apellido,
		user.mail,
		user.celular,
		user.fechaNacimiento,
		user.direccion['calle'],
		user.direccion['numero'],
		user.direccion['codigoPostal'],
		user.id
	], (err, rows, fields) => {
		console.log(user);
		console.log(queryString);
		console.log("err",err,"rows",rows);
		if(err){
			callback({data: err, status: 500});
		}
		callback({data: null, status: 204});
	});
}

function deletee(id, callback){
	const connection = getConnection();
	const queryString = "DELETE FROM usuario WHERE id = ?";
	connection.query(queryString, [id], (err, rows, fields) => {
		if(err){
			callback({data: err, status: 500});
		}
		callback({data: null, status: 200});
	});
}

getDataFromDB = (row) => {
	const user = new User();

	user.id = row.id;
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

module.exports = {getAll, get, post, put, deletee}