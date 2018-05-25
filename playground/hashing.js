const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let data = {
	id:5
};

let password = '123abc';

/*bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password,salt,(err,hash)=>{
		console.log(hash);
	});
});*/

let hashvalue = '$2a$10$8zW7TPH0OlT0Ojzv.yqSUeMbu8ludVhujNc0OGljZuFgfpWq/qoGG';

bcrypt.compare(password,hashvalue,(err,res)=>{
	console.log(res);
});

/*let token = jwt.sign(data,'124abc');

console.log(token);

let decoded = jwt.verify(token,'124abc');

console.log("Decoded:", decoded);*/

/*let message = 'I am user number 3';

let hash = SHA256(message).toString();
console.log(`Message: ${message}`);
console.log(`Hash Message: ${hash}`);

let data = {
	id: 4
};

let token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'secretkey').toString()
};


let resultHash = SHA256(JSON.stringify(token.data) + 'secretkey').toString();

if (token.hash === resultHash) {
	console.log("Data was not changed");
} else {
	console.log("Data was changed. Do not trust the user");
}*/
