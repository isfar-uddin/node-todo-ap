const {MongoClient} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
	if (err) {
		return console.log('Unable to connet database');
	}
	let db = client.db('TodoApp');

	console.log("Connected with database");

	db.collection('Todos').insertOne({
		text: 'Something to be done ',
		completed: true
	}, (err, results) => {
		if (err) {
			return console.log("unable to insert in the database");
		}
		console.log(JSON.stringify(results.ops, undefined, 2));
	});
	db.collection('Users').insertOne({
		name: 'Isfar',
		age: 25,
		location: "Mohammadpur"
	}, (err, res) => {
		if (err) {
			return console.log("unable to connect with database");
		}
		console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
	});
	client.close();
});