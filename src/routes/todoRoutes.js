const todo = require("../models/todo");

module.exports.getTodoById = async (req, res) => {
	const todo = await toto.findById(req.params.id);
	res.render("todo", { todo });
};

module.exports.createTodo = async (req, res) => {
	const {
		body: { name, content },
	} = req;

	const todo = new toto({
		name,
		content,
	});

	await todo.save();
};
