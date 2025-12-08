import { loadMainSide } from "./main.js"
import { loadTaskSide } from "./task_side.js"
import { loadNewSide } from "./new_side.js"

let angle = 0;

export function turnLeft() {
	const cube = document.getElementById("cube");
	angle += 90;
	if (cube)
		cube.style.transform = `rotateY(${angle}deg)`;
	switchSides()
}

export function turnRight() {
	const cube = document.getElementById("cube");
	angle -= 90;
	if (cube)
		cube.style.transform = `rotateY(${angle}deg)`;
	switchSides()
}

function switchSides() {
	console.log(angle)
	if (angle == 0)
		loadMainSide()
	else if (angle == -90)
		loadTaskSide()
	else if (angle == 90)
		loadNewSide()
}

export function addListenersBtns() {
	const cube = document.getElementById("cube");
	console.log('add listeners')
	
	const sla_op_btn = document.getElementById("sla-op")
	if (sla_op_btn) {
		sla_op_btn.addEventListener("click", () => {
			turnLeft();
		});
	}

	const new_task_btn = document.getElementById("nieuwe-taak")
	if (new_task_btn) {
		new_task_btn.addEventListener("click", () => {
			turnRight();
		});
	}


}