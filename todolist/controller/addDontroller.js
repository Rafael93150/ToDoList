const totoModels = require("../models/todoModels");

module.exports.getTodoById = async (req, res) => {
    const todo = await totoModels.findById(req.params.id);
    res.render("todo", { todo });
}

module.exports.createTodo = async (req, res) => {
    const{
        body: {name, content}
    }=req;

    const todo = new totoModels({
        name,
        content
    });

    await todo.save();
    
}