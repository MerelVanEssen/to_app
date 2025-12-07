import ToDo from "./to_do.js";

const todo = new ToDo();

function createTaskWindow(li) {
	const innerFrame = document.createElement("div");
	innerFrame.classList.add("innerframe");
	const task = todo.getTasks()[li.dataset.index];
	innerFrame.innerHTML = 
		"<p>" + task.textContent + "</p><br>"+
		"<p>" + task.categorie + "</p><br>"+
		"<p>Inner tasks:</p><ul id='inner-task-list'></ul>";
	const innerTaskList = innerFrame.querySelector("#inner-task-list");
	task.getInnerTasks().forEach((innerTaskObj, index) => {
		const innerLi = document.createElement("li");
		innerLi.textContent = innerTaskObj.task;
		if (innerTaskObj.completed) {
			innerLi.style.textDecoration = "line-through";
		} else {
			innerLi.addEventListener("click", () => {
				innerTaskObj.completed = true;
				innerLi.style.textDecoration = "line-through";
			});
		}
		innerTaskList.appendChild(innerLi);
	});
	return innerFrame;
}

function openTask(li) {
	const taskWindow = document.createElement("div");
	taskWindow.classList.add("task-window");
	taskWindow.id = "task-window";

	taskWindow.appendChild(createTaskWindow(li));

	const frame = document.getElementById("todo-frame");
	if (!frame) return;
	const TDinnerFrame = document.getElementById("todo-innerframe");
	if (!TDinnerFrame) return;
	TDinnerFrame.style.visibility = "hidden";

	const closeButton = document.createElement("button");
	closeButton.textContent = "Sluit";
	closeButton.addEventListener("click", () => {
		frame.removeChild(taskWindow);
		TDinnerFrame.style.visibility = "visible";
	});

	
	taskWindow.appendChild(closeButton);
	frame.appendChild(taskWindow);
}

// Function to update the to-do list in the DOM
function updateToDoList(todo) {
	const to_do_ul = document.getElementById("todo-list");
	to_do_ul.innerHTML = "";
	var i = 0;

	const tasks = todo.getTasks();
	tasks.forEach((taskObj, index) => {
		const li = document.createElement("li");
		li.id = 'todo-item';
		li.class="clickable-item";
		li.dataset.index = i++;
		li.textContent = taskObj.task;
		if (taskObj.completed) {
			li.style.textDecoration = "line-through";
		} else {
			li.addEventListener("click", () => { openTask(li);});
		}
		to_do_ul.appendChild(li);
	});
}

// Function to update the categorie list in the DOM
function updateCategorieList(todo) {
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

export function main() {
	updateToDoList(todo);
	updateCategorieList(todo);
}

// ----------- EVENT LISTENERS -----------

// Event listeners for adding tasks after pressing the add button
document.getElementById("add-task-btn").addEventListener("click", () => {
	const value = document.getElementById("task-input").value.trim();
	const categorie = document.getElementById("categorie-input").value.trim();
	if (value.length === 0)
		return;
	todo.addTask(value, categorie);
	document.getElementById("task-input").value = "";
	updateToDoList(todo);
});
