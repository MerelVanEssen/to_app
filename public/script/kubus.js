import { loadMainSide } from "./main.js"
import { loadTaskSide } from "./task_side.js"
import { loadNewSide } from "./new_side.js"

let angle = 0;

// left = 90 / right = -90
export function switchSides(turn, to_do, arg) {
	const cube = document.getElementById("cube");
	angle += turn
	if (cube)
		cube.style.transform = `rotateY(${angle}deg)`;
	console.log(angle)
	if (angle == 0) {
		console.log("open main side")
		loadMainSide()
	} else if (angle == 90) {
		console.log("open task side")
		loadTaskSide(to_do, arg)
	} else if (angle == -90) {
		loadNewSide(to_do)
		console.log("open new side")
	}
}
