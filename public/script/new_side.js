import { switchSides } from "./kubus.js"


let listenerAdded = false

function fillDropdownSelectCat(to_do) {
	const select = document.getElementById("select-categorie");
	const categories = to_do.getCategories();
	select.innerHTML = "";
	
	categories.forEach(cat => {
		const option = document.createElement("option");
		option.value = cat;
		option.textContent = cat;
		select.appendChild(option);
	});
}

function saveTaskBtn(to_do) {
	const saveBtn = document.getElementById('sla-op');

	saveBtn.addEventListener('click', () => {
		const taak = document.getElementById('add-taak')
		const categorie = document.getElementById('add-categorie');
		
		const taakInput = taak.value.trim();
		const categorieInput = categorie.value.trim() || 'geen';

		if (!taakInput) {
			alert("Voer een taak in!");
			return;
		}
		to_do.addTask(taakInput, categorieInput);
		taak.value = ""
		categorie.value = ""
		switchSides(90);
	});
}

function doNotSaveTaskBtn(to_do) {
	const backBtn = document.getElementById('sla-niet-op');

	backBtn.addEventListener('click', () => {
		switchSides(90, to_do, []);
	});
}

function addCategorie(to_do) {
	const add_categorie_btn = document.getElementById("add-cat-btn")
	if (add_categorie_btn) {
		add_categorie_btn.addEventListener("click", () => {
			const selected = document.getElementById("add-categorie")
			if (!selected) return
			console.log(selected.value);
			to_do.addCategorie(selected.value);
			fillDropdownSelectCat(to_do)
		});
	}	
}

function addListeners(to_do) {
	saveTaskBtn(to_do)
	doNotSaveTaskBtn()
	addCategorie(to_do)
	listenerAdded = true
}

export function loadNewSide(to_do) {
	if (!listenerAdded)
		addListeners(to_do)
	fillDropdownSelectCat(to_do)
}
