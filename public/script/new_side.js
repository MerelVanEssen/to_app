import { turnLeft } from "./addListenersKubus.js"
import { turnRight } from "./addListenersKubus.js"

let listenerAdded = false

function saveTaskBtn() {
	const saveBtn = document.getElementById('sla-op');

	saveBtn.addEventListener('click', () => {
		const taakInput = document.getElementById('add-taak').value.trim();
		const subtaakInput = document.getElementById('add-subtaak').value.trim();
		const categorieInput = document.getElementById('add-categorie').value.trim() || 'geen';
		
		if (!taakInput) {
			alert("Voer een taak in!");
			return;
		}
		myToDo.addTask({
			task: taakInput,
			subtaak: subtaakInput,
			categorie: categorieInput
		});
		turnLeft();
	});
}

function addListeners() {
	saveTaskBtn()
	listenerAdded = true
}

export function loadNewSide() {
	if (!listenerAdded)
		addListeners()
}
