

class TodoList {
	constructor() {
		this.items = [];
	}

	isUniqueName(name) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].name === name) {
				return false;
			}
		}
		return true;
	}

    lastItemBeforeThirtyMinutes(){
        if (this.items.length > 0) {
			const lastItem = this.items[this.items.length - 1];
			const now = new Date();
			const diff = now - lastItem.createdAt;
			if (diff < 30 * 60 * 1000)
				return false;
		}
        return true;
    }

	add(item) {
		if (!isUserValid()) throw new Error("User is not valid");
		if (items.length >= 10) throw new Error("Todo list is full");
		if (!item.isValidTodo()) throw new Error("Invalid todo");
		if (!this.isUniqueName(item.name))
			throw new Error("Todo name is not unique");
		if (!this.lastItemBeforeThirtyMinutes())
            throw new Error("Last item is not older than 30 minutes");
		this.items.push(item);
        if (this.items.length === 8) EmailSenderService.send();
	}
}

module.exports = TodoList;
