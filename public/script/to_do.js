import { Task } from './task.js';

function introduction() {
	const app = document.getElementById('app'); 
	const intro = document.createElement('div');
	intro.id = 'intro';
	const box = document.createElement('div');
	box.className = 'intro-box';
	const lines = [
		"🎯 Maak een nieuwe taak aan en kies een categorie.",
		"👀 Klik op een taak om hem te bekijken.",
		"✏️ Je kunt een taak ook bewerken als dat nodig is.",
		"✅ Klaar met een taak? Druk op 'V' om hem af te vinken.",
		"❌ Wil je een taak verwijderen? Druk op 'X'."
	];

	lines.forEach(line => {
		const p = document.createElement('p');
		p.textContent = line;
		p.className = "intro-text";
		box.appendChild(p);
	});

	const intro_btn = document.createElement('button');
	intro_btn.className = 'btn';
	intro_btn.textContent = `LET'S GO!`;
	intro_btn.addEventListener('click', () => {
		intro.remove();
	});
	box.appendChild(intro_btn);
	intro.appendChild(box);
	app.appendChild(intro);
}


export class ToDo {
	constructor() {
		this.toDoList = [];
		this.categorieList = [];
		introduction();
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