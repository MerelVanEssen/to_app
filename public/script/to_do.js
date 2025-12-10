import { Task } from './task.js';

export class ToDo {
	constructor() {
		this.toDoList = [];
		this.categorieList = [];
		if (!localStorage.getItem('categorie_list')) {
			this.categorieList = ['geen', 'werk', 'persoonlijk', 'school'];
			localStorage.setItem('categorie_list', JSON.stringify(this.categorieList));
		} else {
			this.categorieList = JSON.parse(localStorage.getItem('categorie_list'));
		}
		if (!localStorage.getItem('to_do_list')) {
			this.toDoList.push(new Task('voorbeeld', 'werk'));
			localStorage.setItem('to_do_list', JSON.stringify(this.toDoList));
		} else {
			this.toDoList = JSON.parse(localStorage.getItem('to_do_list')).map(t => new Task(t.task, t.categorie, t.completed));
		}
	}

	addTask(taskInput, categorieInput='geen') {
		const newTask = new Task(taskInput, categorieInput);
		this.toDoList.push(newTask);
		this.saveToLocalStorage();
	}

	editTask(index, newTaskValue, newCategorie = 'geen') {
		if (!this.toDoList[index]) return console.log('index in toDolist not found');
		this.toDoList[index].task = newTaskValue;
		this.toDoList[index].categorie = newCategorie;
		this.saveToLocalStorage();
	}

	markTaskCompleted(index) {
		if (index === undefined || index === null) {
			console.log('no index given');
			return;
		}
		if (index < this.toDoList.length && this.toDoList[index]) {
			this.toDoList[index].completed = true;
			this.saveToLocalStorage();
		}
	}
	saveToLocalStorage() {
		localStorage.setItem('to_do_list', JSON.stringify(this.toDoList));
	}

	getTasks() { return this.toDoList; }

	getTask(index) {
		if (index === undefined || index === null) return;
		if (index >= 0 && index < this.toDoList.length)
			return this.toDoList[index];
	}
	
	getCategories() { return this.categorieList; }

	removeTask(index) {
		if (index === undefined || index === null) {
			console.log('no index given');
			return;
		}
		if (index >= 0 && index < this.toDoList.length) {
    		this.toDoList.splice(index, 1);
			this.saveToLocalStorage();
		}
		if (this.toDoList.length == 0) {
			this.toDoList.push(new Task('voorbeeld', 'werk'));
			localStorage.setItem('to_do_list', JSON.stringify(this.toDoList));
		}
	}

	addCategorie(categorie) {
		if (!this.categorieList.includes(categorie)) {
			this.categorieList.push(categorie);
			localStorage.setItem('categorie_list', JSON.stringify(this.categorieList));
		} else {
			console.log(`Categorie '${categorie}' bestaat al.`);
		}
	}
}