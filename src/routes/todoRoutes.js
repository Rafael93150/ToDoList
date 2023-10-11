const item = require("../schemas/item");

module.exports.getTodoById = async (req, res) => {
	const item = await toto.findById(req.params.id);
	res.render("item", { item });
};

module.exports.createTodo = async (req, res) => {
	const {
		body: { name, content,created_date },
	} = req;

	try{
		const firstTodo = await item({
			name,
			content,
			created_date,
		});
		await firstTodo.save();
		res.redirect("/");
	}catch(err){
		console.log(err);
	}

	const lastTodo = await item.findOne({}).sort({ _id: -1 }).limit(1);
	if (lastTodo) {
		const lastTodoTime = lastTodo.createdAt.getTime();
		const currentTime = new Date().getTime();
		if (currentTime - lastTodoTime < 1800000) {
			return res.status(429).send("You must wait 30 min");
		}
	}
	const LastTodo = await item({
		name,
		content,
		created_date,
	});

	await LastTodo.save();
};

module.exports.getTodoById = async (req, res) => {
	const item = await toto.findById(req.params.id);
	res.render("item", { item });
}



