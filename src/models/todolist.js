const EmailSenderService = require("./emailsenderservice");

class TodoList {
	constructor(user) {
		this.user = user;
		this.items = [];
        this.sender = new EmailSenderService();
	}

	isUniqueName(name) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].name === name) {
				return false;
			}
		}
		return true;
	}

	lastItemBeforeThirtyMinutes() {
		if (this.items.length > 0) {
			const lastItem = this.items[this.items.length - 1];
			const now = new Date();
			const diff = now - lastItem.createdAt;
			if (diff < 30 * 60 * 1000) {
				return false;
			}
		}
		return true;
	}

	add(item) {
		if (!this.user.isUserValid()) {
			throw new Error("User is not valid");
		}
		if (this.items.length >= 10) {
			throw new Error("Item list is full");
		}
		if (!item.isValidTodo()) {
			throw new Error("Invalid item");
		}
		if (!this.isUniqueName(item.name)) {
			throw new Error("Item name is not unique");
		}
		if (!this.lastItemBeforeThirtyMinutes()) {
			throw new Error("Last item is not older than 30 minutes");
		}
		this.items.push(item);
		if (this.items.length === 8) {
			this.sender.send();
		}
	}
}

module.exports = TodoList;
