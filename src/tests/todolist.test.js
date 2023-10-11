const Todolist = require("../models/todolist");


it("should be invalid if name is empty", () => {
    const todolist = new Todolist ({
        name: "",
        content: "content",
        created_date: Date.now(),
    });
    expect(todolist.add()).toBeFalsy();
    }
)

it("should be invalid if content is empty", () => {
    const todolist = new Todolist ({
        name: "name",
        content: "", 
        created_date: Date.now(),
    });
    expect(todolist.add()).toBeFalsy();
    }
)

it("should be invalid if content is too long", () => {
    const todolist = new Todolist ({
        name: "name",
        content: "content".repeat(1001),
        created_date: Date.now(),
    });
    expect(todolist.add()).toBeFalsy();
    }
)

it("should be valid if content is not empty", () => {
    const todolist = new Todolist ({
        name: "name",
        content: "content",
        created_date: Date.now(),
    });
    expect(todolist.add()).toBeTruthy();
    }
)