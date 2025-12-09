
function getFormattedDate() {
	const nu = new Date();
	const uren = String(nu.getHours()).padStart(2, '0');
	const minuten = String(nu.getMinutes()).padStart(2, '0');
	const dag = String(nu.getDate()).padStart(2, '0');
	const maand = String(nu.getMonth() + 1).padStart(2, '0');
	const jaar = nu.getFullYear();
	return `${uren}:${minuten} ${dag}-${maand}-${jaar}`;
}

export class Task {
	constructor(task, categorie, completed=false) {
		this.task = task;
		if (categorie)
			this.categorie = categorie;
		else
			this.categorie = "alles"
		this.completed = completed;
		this.date = getFormattedDate();
	}
	getTask() { return this.task }
	getCategorie() { return this.categorie }
	getDate() { return this.date }
}