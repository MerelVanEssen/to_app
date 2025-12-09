import { switchSides } from "./kubus.js"

function fillDropdownSelectCat(to_do) {
	const select = document.getElementById("select-categorie");
	if (!select) return console.log("element not found");
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
		const taak = document.getElementById('add-taak');
		const categorie = document.getElementById('add-categorie');
		if (!taak || !categorie) return console.log("element not found");

		const taakInput = taak.value.trim();
		const categorieInput = categorie.value.trim() || 'alles';

		if (!taakInput) {
			alert("Voer een taak in!");
			return;
		}
		to_do.addTask(taakInput, categorieInput);
		taak.value = "";
		categorie.value = "";
		switchSides("back", to_do, []);
	});
}

function doNotSaveTaskBtn(to_do) {
	const backBtn = document.getElementById('sla-niet-op');

	backBtn.addEventListener('click', () => {
		switchSides("back", to_do, []);
	});
}

function addCategorie(to_do) {
	const add_categorie_btn = document.getElementById("add-cat-btn")
	if (add_categorie_btn) {
		add_categorie_btn.addEventListener("click", () => {
			console.log("add categorie?");
			const selected = document.getElementById("add-categorie");
			if (!selected) return console.log("element not found");

			to_do.addCategorie(selected.value);
			fillDropdownSelectCat(to_do);
			selected.value = "";
		});
	}	
}

function addListeners(to_do) {
	saveTaskBtn(to_do);
	doNotSaveTaskBtn(to_do);
	addCategorie(to_do);
}

export function loadNewSide(to_do) {
	addListeners(to_do);
	fillDropdownSelectCat(to_do);
}
