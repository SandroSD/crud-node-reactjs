const User = require('../modelos/usuario');
const MongoClient = require('mongodb').MongoClient;
const url ="mongodb://localhost:27017/";
const mongoose = require('mongoose');

function getAll(callback){
	let users = [];
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
		if(err) throw err;
		const conn = db.db("mydb");
		conn.collection("usuarios").find({}).toArray(function(err, result){
			if(err) throw err;
			callback({data: result, status: 200});
			db.close();
		});
	});
	/*const connection = getConnection();
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
	});*/
}

function get(id, callback){
	let user = "";
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
		if(err) throw err;
		const conn = db.db("mydb");
		conn.collection("usuarios").findOne({"_id": mongoose.Types.ObjectId(id)},function(err, result){
			if(err) throw err;
			if(result){
				callback({data: result, status: 200});
			}else{
				callback({data: result, status: 204});
			}
			db.close();
		});
	});
	/*const connection = getConnection();
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
	});*/
}

function post(user, callback){
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
		if(err) throw err;
		const conn = db.db("mydb");
		conn.collection("usuarios").insertOne(user, function(err, result){
			if(err){
				console.log("Error", err);
				callback({data: err, status: 500});
			}
			callback({data: user, status: 201});
			db.close();
		});
	});
	/*const connection = getConnection();
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
	});*/
}

function put(user, callback){
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
		if(err) throw err;
		const conn = db.db("mydb");
		console.log("----------------------------------");
		console.log("user", {user});
		console.log("----------------------------------");
		conn.collection("usuarios").findOneAndUpdate({"_id": mongoose.Types.ObjectId(user._id)},
			{$set: user},
			
			function(err, result){
				console.log("res", result);
				if(err) callback({data: err, status: 500});
				callback({data: null, status:204});
				
				db.close();
		});
	});
	/*const connection = getConnection();
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
	});*/
}

function deletee(id, callback){
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
		if(err) throw err;
		const conn = db.db("mydb");
		conn.collection("usuarios").deleteOne({id: id}, function(err, result){
			if(err) callback({data: err, status: 500});
				callback({data: null, status: 200});

			db.close();
		});
	});
	/*const connection = getConnection();
	const queryString = "DELETE FROM usuario WHERE id = ?";
	connection.query(queryString, [id], (err, rows, fields) => {
		if(err){
			callback({data: err, status: 500});
		}
		callback({data: null, status: 200});
	});*/
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

module.exports = {getAll, get, post, put, deletee}