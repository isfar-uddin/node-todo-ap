const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: 10,
		required: [true, 'Email is required'],
		validate: {
			validator: function (v) {
				return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
			},
			message: '{VALUE} is not a valid email!'
		},
		trim: true
	},
	password: {
		type: String,
		minlength: 6,
		required: [true, 'Password is required']
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});
	return user.save().then(() => {
		return token;
	});

};

UserSchema.statics.findByToken = function (token) {
	let User = this;
	let decoded;
	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};