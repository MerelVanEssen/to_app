
export class Task {
	constructor(task, categorie, completed = false, isInnerTask = false) {
		this.task = task;
		this.categorie = categorie;
		this.completed = completed;
		this.innerTasks = [];
		this.isInnerTask = isInnerTask;
	}
	addInnerTask(innerTask) {
		if (this.isInnerTask)
			return;
		this.innerTasks.push({ task: innerTask, completed: false, innerTask: true });
	}
	removeInnerTask(index) {
		this.innerTasks.splice(index, 1);
	}
	getInnerTasks() {
		return this.innerTasks;
	}
}