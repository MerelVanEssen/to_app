import { switchSides } from "./kubus.js";

let listenerAdded = false

function openTask(todo, li) {
	const tasks = todo.getTasks();
	const taskObj = tasks[li.dataset.index]
	const task = document.getElementById("current-task");
	const cat = document.getElementById("current-cat");
	if (!task || !cat) return

	task.textContent = taskObj.task
	if (taskObj.categorie)
		cat.textContent = taskObj.categorie
	else
		cat.textContent = "geen"
}

function addListeners(to_do, li) {
	const back_btn = document.getElementById("terug-menu");
	if (back_btn) {
		back_btn.addEventListener("click", () => {
			switchSides(-90, to_do);
		});
	}

	const edit_btn = document.getElementById("edit");
	if (edit_btn) {
		edit_btn.addEventListener("click", () => {
			switchSides(90, to_do, li);
		});
	}
	listenerAdded = true
}

export function loadTaskSide(to_do, li) {
	if (!listenerAdded)
		addListeners(to_do, li)
	openTask(to_do, li)
}