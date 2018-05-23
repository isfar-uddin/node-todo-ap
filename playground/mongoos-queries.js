const {ObjectId} = require('mongodb');

let {mongoose} = require('./../server/db/mongoose');
let {User} = require('./../server/models/user');

const ID = '5b03fa1fdcd3c517b8a0deed56';

if(!ObjectId.isValid(ID)){
	console.log("Id not found");
}

User.findById(ID).then((user) => {
	if (!user) {
		return console.log("User not found");
	}
	console.log("Users: ", user);
}).catch((e) => {
	console.log(e);
});