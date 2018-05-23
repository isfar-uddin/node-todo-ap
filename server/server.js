let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/User');
let {Todo} = require('./models/todo');

let app = express();

app.use(bodyParser.json());

app.post('/user', (req, res) => {
	let newUser = new User({
		email: req.body.email
	});
	newUser.save().then((response) => {
		res.send(response);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.post('/todos', (req, res) => {
	let newTodo = new Todo({
		text: req.body.text
	});

	newTodo.save().then((response) => {
		res.send(response);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send(todos);
	}, (err) => {
		res.status(400).send(err);
	});
});


app.listen(3000, () => {
	console.log("Listening at port 3000");
});

module.exports = {app};