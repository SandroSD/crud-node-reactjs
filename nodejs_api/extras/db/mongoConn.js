const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db){
	if(err) throw err;
	console.log("DB created");
	db.close();
});

MongoClient.connect(url, function(err, db){
	if(err) throw err;
	const conn = db.db("mydb");
	conn.createCollection("usuarios", function(err, res){
		if(err) throw err;
		console.log("Collection created");
		db.close();
	});
});