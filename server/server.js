require('./../config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/user');
let {Todo} = require('./models/todo');
let {authenticate} = require('./middleware/authenticate');
let app = express();

app.use(bodyParser.json());

app.post('/user', (req, res) => {

	let body = _.pick(req.body, ['email', 'password']);

	let newUser = new User(body);

	newUser.save().then(() => {
		return newUser.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(newUser);
	}).catch((e) => {
		console.log(e);
		res.status(400).send(e);
	});
});


app.get('/user/me', authenticate, (req, res) => {
	console.log(req.token);
	res.send(req.user);
});

app.post('/user/login', (req, res) => {
	let body = _.pick(req.body, ['email', 'password']);

	User.findByCredential(body.email, body.password).then((user) => {
		if (!user) {
			res.status(400).send();
		}
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/user/logout', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		console.log(res);
		res.status(200).send();
	}, (e) => {
		res.status(400).send();
	});
});

app.get('/user/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	User.findById(id).then((user) => {
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	}).catch((e) => {
		return res.status(400).send(e);
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

app.get('/todos/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	}).catch((e) => {
		return res.status(400).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send();
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});


app.listen(process.env.port, () => {
	console.log(`Listening at port ${process.env.port}`);
});

module.exports = {app};