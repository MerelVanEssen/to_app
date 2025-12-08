import { switchSides } from "./kubus.js"

let listenerAdded = false

function saveTaskBtn(to_do) {
	const saveBtn = document.getElementById('sla-op');

	saveBtn.addEventListener('click', () => {
		const taakInput = document.getElementById('add-taak').value.trim();
		const categorieInput = document.getElementById('add-categorie').value.trim() || 'geen';
		
		if (!taakInput) {
			alert("Voer een taak in!");
			return;
		}
		to_do.addTask(taakInput, categorieInput);
		// taakInput.textContent = ""
		// categorieInput.textContent = ""
		switchSides(90);
	});
}

function doNotSaveTaskBtn(to_do) {
	const backBtn = document.getElementById('sla-niet-op');

	backBtn.addEventListener('click', () => {
		switchSides(90, to_do, []);
	});
}

function addListeners(to_do) {
	saveTaskBtn(to_do)
	doNotSaveTaskBtn()
	listenerAdded = true
}

export function loadNewSide(to_do) {
	if (!listenerAdded)
		addListeners(to_do)
}
