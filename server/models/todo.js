let mongoose = require ('mongoose');

/*let TodoSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

module.exports= mongoose.model("Todo", TodoSchema);*/

let Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

module.exports={
	Todo
};