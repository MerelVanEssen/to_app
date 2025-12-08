import { switchSides } from "./kubus.js";

let listenerAdded = false


function addListeners(to_do, li) {
	const edit_btn = document.getElementById("edit-task-btn")
	const edit_not_btn = document.getElementById("edit-niet-btn")
	if (!edit_btn || !edit_not_btn) return
	console.log(li);

	edit_btn.addEventListener("click", () => {
		const index = li.dataset.index;
		const taak = document.getElementById('edit-task')
		const categorie = document.getElementById('edit-category');
		
		const taakInput = taak.value.trim();
		const categorieInput = categorie.value.trim() || 'geen';
		if (!taakInput) {
			alert("Voer een taak in!");
			return;
		}
		to_do.editTask(index, taakInput, categorieInput);
		switchSides(-90, to_do, li);
	});

	edit_not_btn.addEventListener("click", () => {
		switchSides(-90, to_do, li);
	});
}

function fillInOldInformation(to_do, li) {
	const task = to_do.getTask(li.dataset.index);
	if (!task) return

	const taakInput = document.getElementById('edit-task');
	const categorieSelect = document.getElementById('edit-category');
	taakInput.placeholder = task.getTask();
	categorieSelect.value = task.getCategorie();
}

export function loadEditSide(to_do, li) {
	if (!listenerAdded) {
		addListeners(to_do, li);
	}
	fillInOldInformation(to_do, li)
}