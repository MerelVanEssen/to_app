import { ToDo } from "./to_do.js";
import { switchSides } from "./kubus.js"

const todo = new ToDo();
let listenerAdded = false

function createBtn(className, id, textContent) {
	const btn = document.createElement("button");
	btn.className = className;
	btn.id = id;
	btn.textContent = textContent;
	return btn
}

function fillDropdownCat() {
	const select = document.getElementById("category-select");
	const categories = todo.getCategories();
	select.innerHTML = "";
	categories.forEach(cat => {
		const option = document.createElement("option");
		option.value = cat;
		option.textContent = cat;
		select.appendChild(option);
	});
}

// // Function to update the to-do list in the DOM
export function addItemsToDo() {

	const to_do_ul = document.getElementById("todo-list");
	const finished_ul = document.getElementById("finished-list");
	if (!to_do_ul || !finished_ul) return

	to_do_ul.innerHTML = "";
	finished_ul.innerHTML = ""

	const tasks = todo.getTasks();
	tasks.forEach((taskObj, i) => {
		console.log("task:", taskObj, "i: ", i )
		const li = document.createElement("div")
		const custom_li = document.createElement("div");
		custom_li.className ="clickable-item";
		custom_li.dataset.index = i
		custom_li.textContent = taskObj.getTask() + "[" + taskObj.getCategorie() + "]";

		if (taskObj.completed)
			custom_li.style.textDecoration = "line-through";

		const completeBtn = createBtn("complete-btn", "", "✔");
		const deleteBtn = createBtn("delete-btn", "", "✖");
		completeBtn.addEventListener('click', () => todo.markTaskCompleted(i));
		deleteBtn.addEventListener('click', () => {
			todo.removeTask(i);
			li.remove()
		});

		custom_li.addEventListener("click", () => {
			switchSides(90, todo, custom_li);	
		});

		li.append(custom_li, completeBtn, deleteBtn)

		if (!taskObj.completed)
			to_do_ul.appendChild(li);
		else
			finished_ul.appendChild(li)

	});
}

function addListeners() {
	const new_task_btn = document.getElementById("nieuwe-taak")
	if (new_task_btn) {
		new_task_btn.addEventListener("click", () => {
			switchSides(-90, todo);
		});
	}

	const select_categorie_btn = document.getElementById("select-cat-btn")
	if (select_categorie_btn) {
		select_categorie_btn.addEventListener("click", () => {
			const value = document.getElementById("category-select").value;

		});
	}
	listenerAdded = true
}

export function loadMainSide() {
	if (!listenerAdded)
		addListeners()
	fillDropdownCat()
	addItemsToDo();
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
