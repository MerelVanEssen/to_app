import { switchSides } from "./kubus.js";

function openTask(todo, li) {
	const tasks = todo.getTasks();
	const taskObj = tasks[li.dataset.index]
	const task = document.getElementById("current-task");
	const cat = document.getElementById("current-cat");
	const date = document.getElementById("current-date");
	if (!task || !cat || !date) return console.log("element not found");

	task.textContent = taskObj.getTask();
	if (taskObj.categorie)
		cat.textContent = taskObj.getCategorie();
	else
		cat.textContent = "alles";
	date.textContent = taskObj.getDate();
}

function addListeners(to_do, li) {
	const back_btn = document.getElementById("terug-menu");
	if (!back_btn) return console.log("element not found");

	back_btn.addEventListener("click", () => {
		switchSides("back", to_do, []);
	});

	const edit_btn = document.getElementById("edit");
	if (!edit_btn) return console.log("element not found");

	edit_btn.addEventListener("click", () => {
		switchSides("edit", to_do, li);
	});
}

export function loadTaskSide(to_do, li) {
	addListeners(to_do, li);
	openTask(to_do, li);
}