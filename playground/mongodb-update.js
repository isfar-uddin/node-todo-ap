const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
	if(err){
		console.log(err);
	}
	let db = client.db('TodoApp');
	console.log('Connected with database');

	db.collection('Users').findOneAndUpdate({
		_id:new ObjectId("5b03a9f7fa5ca52410943e89")
	},{
		$set:{
			name:'Changed'
		},
		$inc:{
			age:1
		}
	},{
		returnOriginal:false
	}).then((result)=>{
		console.log(result);
	});

	client.close();
});