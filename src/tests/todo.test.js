const Todo= require("../models/todo");

discribe("Todo", () => {
    it("should be invalid if name is empty", () => {
        const todo = new Todo({
            name: "",
            content: "content",
            created_date: Date.now(),
        });
        expect(todo.isValidTodo()).toBeFalsy();
        })
 
    it("should be invalid if content is empty", () => {
        const todo = new Todo({
            name: "name",
            content: "",
            created_date: Date.now(),
        });
        expect(todo.isValidTodo()).toBeFalsy();
        }
    )

    it("should be invalid if content is too long", () => {
        const todo = new Todo({
            name: "name",
            content: "content".repeat(1001),
            created_date: Date.now(),
        });
        expect(todo.isValidTodo()).toBe(true);
        }
    )

    it("should add a todo", () => {
        const todo = new Todo({
            name: "name",
            content: "content",
            created_date: Date.now(),
        });
        expect(todo.isValidTodo()).toBe(true);
        }
    )

})