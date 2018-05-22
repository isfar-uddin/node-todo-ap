const {MongoClient} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
	if (err) {
		return console.log('Unable to connet database');
	}
	let db = client.db('TodoApp');

	console.log("Connected with database");

	db.collection('Todos').find().count().then((count)=>{
		console.log(`Todos : ${count}`);
	},(err)=>{
		console.log(err);
	});
	client.close();
});