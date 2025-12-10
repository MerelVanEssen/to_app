import { switchSides } from './kubus.js';

let listenerAdded = false

function openTask(todo, li) {
	const tasks = todo.getTasks();
	const taskObj = tasks[li.dataset.index]
	const task = document.getElementById('current-task');
	const cat = document.getElementById('current-cat');
	const date = document.getElementById('current-date');
	if (!task || !cat || !date) return console.log('Open task: element not found');

	task.textContent = taskObj.getTask();
	if (taskObj.categorie)
		cat.textContent = taskObj.getCategorie();
	else
		cat.textContent = 'geen';
	date.textContent = taskObj.getDate();
}

function addListeners(to_do, li) {
	const back_btn = document.getElementById('back-menu');
	if (!back_btn) return console.log('Open task: element not found');

	back_btn.addEventListener('click', () => {
		switchSides('main', 90, to_do, []);
	});

	const edit_btn = document.getElementById('forward-edit');
	if (!edit_btn) return console.log('Open task: element forward-edit not found');

	edit_btn.addEventListener('click', () => {
		switchSides('edit', -90, to_do, li);
	});
}

export function loadTaskSide(to_do, li) {
	if (!listenerAdded)
		addListeners(to_do, li);
	openTask(to_do, li);
}