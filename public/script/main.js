import { ToDo } from "./to_do.js";
import { addListenersBtns } from "./addListenersKubus.js"
import {turnLeft } from "./addListenersKubus.js"
import {turnRight } from "./addListenersKubus.js"
import {openTask } from "./task_side.js"

const todo = new ToDo();

function createBtn(className, id, textContent, onClick, arg) {
	const btn = document.createElement("button");
	btn.className = className;
	btn.id = id;
	btn.textContent = textContent;
	if (onClick && typeof onClick === "function")
		btn.addEventListener('click', onClick.bind(todo, arg));
	return btn
}

// // Function to update the to-do list in the DOM
export function loadMainSide() {
	const to_do_ul = document.getElementById("todo-list");
	const finished_ul = document.getElementById("finished-list");
	if (!to_do_ul || !finished_ul) return

	to_do_ul.innerHTML = "";
	finished_ul.innerHTML = ""

	const tasks = todo.getTasks();
	tasks.forEach((taskObj, i) => {
		const li = document.createElement("li");
		li.className ="clickable-item";
		li.dataset.index = i
		li.textContent = taskObj.task + "[" + taskObj.categorie + "]";

		if (taskObj.completed)
			li.style.textDecoration = "line-through";

		const completeBtn = createBtn("complete-btn", "", "✔", todo.markTaskCompleted, i);
		const deleteBtn = createBtn("delete-btn", "", "✖", todo.removeTask, i);

		li.append(completeBtn, deleteBtn)

		li.addEventListener("click", () => {
			openTask(todo, li);
			turnLeft();
			
		});

		if (!taskObj.completed)
			to_do_ul.appendChild(li);
		else
			finished_ul.appendChild(li)

	});
}

// Function to update the categorie list in the DOM
function loadCategorieList(todo) {
	const categorie_ul = document.getElementById("categorie-input");
	if (!categorie_ul) return;
	categorie_ul.innerHTML = "";
	const dropdown = document.getElementById("dropdown-categorie");
	if (!dropdown) return;
    dropdown.innerHTML = "";
	const categories = todo.categorieList;
	var i = 0;

	categories.forEach((categorie) => {
		// Add to categorie list
		const li = document.createElement("li");
		li.id = 'categorie-item';
		li.class="clickable";
		li.dataset.index = i++;
		li.textContent = categorie;
		categorie_ul.appendChild(li);

		// Add to dropdown
		const item = document.createElement("div");
		item.classList.add("dropdown-item");
        item.textContent = categorie;
		item.addEventListener("click", () => {
            document.getElementById("categorie-input").value = categorie;
			dropdown.classList.remove("show");
        });
		dropdown.appendChild(item);
	});
}

export function mainSide() {
	addListenersBtns()
	loadMainSide();
	loadCategorieList(todo);
}

// // ----------- EVENT LISTENERS -----------

// // Event listeners for adding tasks after pressing the add button
// document.getElementById("add-task-btn").addEventListener("click", () => {
// 	const value = document.getElementById("task-input").value.trim();
// 	const categorie = document.getElementById("categorie-input").value.trim();
// 	if (value.length === 0)
// 		return;
// 	todo.addTask(value, categorie);
// 	document.getElementById("task-input").value = "";
// 	updateToDoList(todo);
// });
