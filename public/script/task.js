
export class Task {
	constructor(task, categorie, completed=false) {
		this.task = task;
		if (categorie)
			this.categorie = categorie;
		else
			this.categorie = "geen"
		this.completed = completed;
	}
	getTask() { return this.task }
	getCategorie() { 
		return this.categorie }
}