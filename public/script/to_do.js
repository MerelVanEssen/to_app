import { Task } from "./task.js";

export class ToDo {
	constructor() {
		this.toDoList = [];
		this.categorieList = [];
		if (!localStorage.getItem("categorie_list")) {
			this.categorieList = ['geen', 'werk', 'persoonlijk', 'school'];
			localStorage.setItem("categorie_list", JSON.stringify(this.categorieList));
		} else {
			this.categorieList = JSON.parse(localStorage.getItem("categorie_list"));
		}
		if (!localStorage.getItem("to_do_list")) {
			this.toDoList.push(new Task("to do lijst vullen", "geen"))
			localStorage.setItem("to_do_list", JSON.stringify(this.toDoList));
		} else {
			this.toDoList = JSON.parse(localStorage.getItem("to_do_list")).map(t => new Task(t.task, t.completed, t.isInnerTask));
		}
	}

	addTask(task, categorie = 'geen') {
		this.toDoList.push(new Task(task, categorie));
		this.saveToLocalStorage();
	}
	markTaskCompleted(index) {
		if (index === undefined || index === null) {
			console.log("no index given");
			return;
		}
		if (index < this.toDoList.length && this.toDoList[index]) {
			this.toDoList[index].completed = true;
			this.saveToLocalStorage();
		}
	}
	saveToLocalStorage() {
		localStorage.setItem("to_do_list", JSON.stringify(this.toDoList));
	}
	getTasks() {
		return this.toDoList;
	}
	removeTask(index) {
		if (index === undefined || index === null) {
			console.log("no index given");
			return;
		}
		if (index >= 0 && index < this.toDoList.length) {
    		this.toDoList.splice(index, 1);
			this.saveToLocalStorage();
		}
		if (this.toDoList.length == 0) {
			this.toDoList.push(new Task("to do lijst vullen", "geen"))
			localStorage.setItem("to_do_list", JSON.stringify(this.toDoList));
		}
	}
}