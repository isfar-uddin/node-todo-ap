let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = './db/mongoose';
let {User} = './models/User';
let {Todo} = './models/todo';

let app = express();

app.use(bodyParser.json());

app.post('/todo', (req, res) => {
	console.log(req.body);
});


/*let completedTodo = new Todo({
 text: 'Created table '
 });


 completedTodo.save().then((res) => {
 console.log(`Save todo: ${res}`);
 }, (err) => {
 console.log('Unable to save todo', err);
 });

 let newUser = new User({
 email: 'abcsbdfhasdfsgddg'
 });
 newUser.save().then((response) => {
 console.log(`email saved: ${JSON.stringify(response, undefined, 2)}`);
 }, (err) => {
 console.log('unable to save data', err);
 });*/


app.listen(3000, () => {
	console.log("Listening at port 3000");
});