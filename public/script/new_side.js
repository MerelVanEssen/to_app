import { switchSides } from './kubus.js'

let listenerAdded = false

function fillDropdownSelectCat(to_do) {
	const select = document.getElementById('select-categorie');
	if (!select) return console.log('fillDropdownSelectCat: element not found');
	const categories = to_do.getCategories();
	select.innerHTML = '';
	
	categories.forEach(cat => {
		const option = document.createElement('option');
		option.value = cat;
		option.textContent = cat;
		select.appendChild(option);
	});
}

let justPressed = false

function saveTaskBtn(to_do) {
	const saveBtn = document.getElementById('back-save');

	saveBtn.addEventListener('click', () => {
		if (justPressed) return
		justPressed = true;
		const taak = document.getElementById('add-taak');
		const categorie = document.getElementById('select-categorie');
		if (!taak || !categorie) return console.log('saveTaskBtn: element not found');

		const taakInput = taak.value.trim();
		const categorieInput = categorie.value.trim() || 'geen';

		if (!taakInput) {
			alert('Voer een taak in!');
				setTimeout(() => {
				justPressed = false;
			}, 500);
			return;
		}
		to_do.addTask(taakInput, categorieInput);
		taak.value = '';
		categorie.value = 'geen';
		switchSides('main', 90, to_do, []);
		setTimeout(() => {
			justPressed = false;
		}, 500);
	});
}

function doNotSaveTaskBtn(to_do) {
	const backBtn = document.getElementById('back-not-save');

	backBtn.addEventListener('click', () => {
		switchSides('main', 90, to_do, []);
	});
}

function addCategorie(to_do) {
	const add_categorie_btn = document.getElementById('add-cat-btn')
	if (add_categorie_btn) {
		add_categorie_btn.addEventListener('click', () => {
			console.log('add categorie?');
			const selected = document.getElementById('add-categorie');
			if (!selected) return console.log('addCategorie: element not found');

			const value = selected.value.trim(); 
			if (value.length == 0) {
				alert("Geef een categorienaam");
				return;
			}
			if (value.length > 15) {
				alert("Deze categorienaam is te lang");
				return;
			}
			const categorie = document.getElementById('select-categorie');
			to_do.addCategorie(value);
			fillDropdownSelectCat(to_do);
			categorie.value = value;
			selected.value = '';
		});
	}	
}

function addListeners(to_do) {
	saveTaskBtn(to_do);
	doNotSaveTaskBtn(to_do);
	addCategorie(to_do);
	listenerAdded = true;
}

export function loadNewSide(to_do) {
	if (!listenerAdded)
		addListeners(to_do);
	fillDropdownSelectCat(to_do);
}
