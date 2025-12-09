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
		const categorieInput = categorie.value.trim() || 'alles';
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
	console.log("filling?")
	const taakInput = document.getElementById('edit-task');
	const categorieSelect = document.getElementById('edit-category');
	console.log(task.getTask())
	taakInput.value = task.getTask();
	categorieSelect.value = task.getCategorie();
}

function fillDropdownCat(to_do) {
	const select = document.getElementById("edit-category");
	const categories = to_do.getCategories();
	select.innerHTML = "";
	if (!select) return;
	categories.forEach(cat => {
		const option = document.createElement("option");
		option.value = cat;
		option.textContent = cat;
		select.appendChild(option);
	});
}

export function loadEditSide(to_do, li) {
	if (!listenerAdded) {
		addListeners(to_do, li);
		listenerAdded = true;
	}
	fillInOldInformation(to_do, li);
	fillDropdownCat(to_do);
}