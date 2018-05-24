let {User} = require('./../models/user');

let authenticate = (req, res, next) => {
	let token = req.header('x-auth');
	User.findByToken(token).then((user) => {
		if (!user) {
			return Promise.reject();
		}
		res.send(user);
		next();
	}).catch((e) => {
		res.status(401).send();
	});
};

module.exports = {authenticate};