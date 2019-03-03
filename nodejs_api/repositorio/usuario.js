const dbConn = require('../extras/db/conexion');
const User = require('../modelos/usuario');
const mongoose = require('mongoose');

function getConnection(){
	return dbConn;
}

function getAll(callback){
	let users = [];
	const connection = getConnection();
	const queryString = "SELECT * FROM users";
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
	const queryString = "SELECT * FROM users WHERE id = ?";
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
	const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
	connection.query(queryString, [user.first_name, user.last_name], (err, rows, fields) => {
		if(err){
			callback({data: err, status: 500});
		}
		user.id = rows.insertId;
		callback({data: user, status: 201});
	});
}

function put(user, callback){
	const connection = getConnection();
	const queryString = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?";
	connection.query(queryString, [user.first_name, user.last_name, user.id], (err, rows, fields) => {
		if(err){
			callback({data: err, status: 500});
		}
		callback({data: null, status: 204});
	});
}

function deletee(id, callback){
	const connection = getConnection();
	const queryString = "DELETE FROM users WHERE id = ?";
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
	user.nombre = row.first_name;
	user.apellido = row.last_name;

	return user;
}

module.exports = {getAll, get, post, put, deletee}