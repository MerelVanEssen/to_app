import { ToDo } from './to_do.js';
import { switchSides } from './kubus.js'

const todo = new ToDo();
let listenerAdded = false;
let lastCategorie = 'alle';

function createBtn(className, id, textContent) {
	const btn = document.createElement('button');
	btn.className = className;
	btn.id = id;
	btn.textContent = textContent;
	btn.style.color = 'white';
	btn.style.color = 'var(--color-secondary)';
	btn.style.height = '1rem';
	btn.style.width = '1rem';
	btn.style.display = 'flex';
	btn.style.alignItems = 'center';
	btn.style.justifyContent = 'center';
	btn.style.padding = '0';
	btn.style.border = 'none';
	btn.style.lineHeight = '1';
	btn.style.fontSize = '0.75rem';
	btn.style.fontFamily = 'inherit';
	return btn
}

function fillDropdownCat() {
	const select = document.getElementById('category-select');
	if (!select) return console.log('element not found');

	const categories = todo.getCategories();
	select.innerHTML = '';
	const option = document.createElement('option');
	option.value = 'alle';
	option.textContent = 'alle';
	select.appendChild(option);

	categories.forEach(cat => {
		const option = document.createElement('option');
		option.value = cat;
		option.textContent = cat;
		select.appendChild(option);
	});
	if (lastCategorie)
		select.value = lastCategorie;
}

function createTaskBts(todo, li, i, to_do_ul, finished_ul, complete) {
	const btnContainer = document.createElement('div');
	btnContainer.className = 'task-buttons';
	const deleteBtn = createBtn('delete-btn', '', '✖');
	let completeBtn = null;
	if (!complete) {
		completeBtn = createBtn('complete-btn', '', '✔');
		completeBtn.addEventListener('click', () => {
			todo.markTaskCompleted(i);
			to_do_ul.removeChild(li);
			completeBtn.style.visibility = 'hidden';
			finished_ul.append(li);
		});
		btnContainer.appendChild(completeBtn);
	}
	deleteBtn.addEventListener('click', () => {
		todo.removeTask(i);
		li.remove();
	});
	btnContainer.appendChild(deleteBtn);
	return btnContainer;
}

// // Function to update the to-do list in the DOM
export function addItemsToDo() {
	const to_do_ul = document.getElementById('todo-list');
	const finished_ul = document.getElementById('finished-list');
	if (!to_do_ul || !finished_ul) return console.log('addItemsToDo: element not found');

	to_do_ul.innerHTML = '';
	finished_ul.innerHTML = '';

	const tasks = todo.getTasks();
	tasks.forEach((taskObj, i) => {
		const cat = taskObj.getCategorie();
		if (lastCategorie == 'alle' || lastCategorie == cat) {
			const li = document.createElement('li')
			li.className = 'task-row';
			li.style.align = 'right';

			const taskText = document.createElement('div');
			taskText.className ='clickable-item';
			taskText.dataset.index = i
			taskText.textContent = taskObj.getTask();
			taskText.addEventListener('click', () => {
				switchSides('task', -90, todo, taskText);	
			});

			const btnContainer = createTaskBts(todo, li, i, to_do_ul, finished_ul, taskObj.completed);
			li.append(taskText, btnContainer);

			if (!taskObj.completed)
				to_do_ul.appendChild(li);
			else
				finished_ul.appendChild(li)
		}
	});
}

function addListeners() {
	const new_task_btn = document.getElementById('forward-new')
	if (!new_task_btn) return console.log('element not found');

	new_task_btn.addEventListener('click', () => {
		switchSides('new', -90, todo);
	});

	const select_categorie_btn = document.getElementById('select-cat-btn')
	if (!select_categorie_btn) return console.log('Main listeners: element select-cat-btn not found');

	select_categorie_btn.addEventListener('click', () => {
		const selected = document.getElementById('category-select')
		if (!selected) return console.log('Main listeners: element category-select not found');
		lastCategorie = selected.value;
		console.log(selected.value);
		addItemsToDo();
	});

	listenerAdded = true
}

export function loadMainSide() {
	if (!listenerAdded)
		addListeners();
	fillDropdownCat();
	addItemsToDo();
}
