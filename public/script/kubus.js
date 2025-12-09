import { loadMainSide } from "./main.js"
import { loadTaskSide } from "./task_side.js"
import { loadNewSide } from "./new_side.js"
import { loadEditSide } from "./edit_side.js"

let angle = 0;
let lastSide = "";
let lastArg = ""

function changeSides(side) {
	const task_side = document.getElementById("task-side");
	const new_side = document.getElementById("new-side");
	if (!task_side || !new_side) return console.log("element not found");

	if (side == "task") {
		new_side.style.display = "none";
		task_side.style.display = "flex";
	} else {
		task_side.style.display = "none";
		new_side.style.display = "flex";
	}
}

export function switchSides(side, to_do, arg) {
	const cube = document.getElementById("cube");
	const shadow = document.getElementById("cube-shadow");
	if (!cube || !shadow) return console.log("element not found");

	if (side == "back")
		angle += 90;
	else
		angle -= 90;

	if (cube)
		cube.style.transform = `rotateY(${angle}deg)`;
	if (shadow)
		shadow.style.transform = `translateX(-50%) rotateX(90deg)`;

	if (side == "back") {
		side = lastSide;
		arg = lastArg;
	}

	switch(side) {
		case "main":
			loadMainSide()
			break;
		case "task":
			changeSides(side);
			loadTaskSide(to_do, arg);
			break;
		case "new":
			changeSides(side);
			loadNewSide(to_do)
			break;
		case "edit":
			loadEditSide(to_do, arg);
			break;
		default:
			console.log("not known side switch");
	}
	lastSide = side;
	lastArg = arg;
}
