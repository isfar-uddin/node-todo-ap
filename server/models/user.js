let mongoose = require('mongoose');

let User = mongoose.model('User', {
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
	}
});

module.exports={User};