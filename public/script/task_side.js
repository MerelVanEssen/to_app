
let listenerAdded = false

export function openTask(todo, li) {
	const taskObj = todo.getTasks()[li.dataset.index];
	const task = document.getElementById("current-task");
	const subtask = document.getElementById('current-subtask')
	const cat = document.getElementById("current-cat");
	if (!task || !subtask || !cat) return

	task.textContent = taskObj.textContent
	cat.textContent = taskObj.textContent
	
	taskObj.getInnerTasks().forEach((innerTaskObj, index) => {
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
		subtask.appendChild(innerLi);
	});
}

function addListeners() {
	const back_btn = document.getElementById("terug-menu")
	if (back_btn) {
		back_btn.addEventListener("click", () => {
			turnRight();
		});
	}

	listenerAdded = true
}

export function loadTaskSide() {
	if (!listenerAdded)
		addListeners()
}