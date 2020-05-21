let angleSld, angleRndSld;
let lengthSld, lengthRndSld;
let thicknessSld, thicknessRndSld;
let lengthDecaySld, thicknessDecaySld;
let seedSld, maxLevelSld;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	angleSld = new Slider(start=0, end=PI/2, value=PI/6, 0, 0, 100, 10, null, "Angle");
	angleRndSld = new Slider(start=0, end=1, value=0.2, 0, 0, 100, 10, null, "Angle Randomness");

	lengthSld = new Slider(start=height/10, end=height/2, value=height/5, 0, 0, 100, 10, null, "Initial lenght");
	lengthRndSld = new Slider(start=0, end=0.5, value=0.2, 0, 0, 100, 10, null, "Length Randomness");

	thicknessSld = new Slider(start=1, end=15, value=4, 0, 0, 100, 10, null, "Thickness");
	thicknessRndSld = new Slider(start=0, end=0.3, value=0.2, 0, 0, 100, 10, null, "Thickness Randomness");

	lengthDecaySld = new Slider(start=0.1, end=1, value=0.7, 0, 0, 100, 10, null, "Length decay");
	thicknessDecaySld = new Slider(start=0.1, end=1, value=0.8, 0, 0, 100, 10, null, "Thickness decay");

	seedSld = new Slider(start=1, end=100, value=19, 0, 0, 100, 10, 1, "Random seed");
	let tmp = new UiElement();

	maxLevelSld = new Slider(start=1, end=10, value=5, 0, 0, 100, 10, 1, "Max depth level");
	tmp = new UiElement();

	UI.tableWidth = 2;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	randomSeed(seedSld.value);
	background(32);
	UI.update();
	UI.draw();
	drawTree();
}

function drawTree() {
	translate(2*width/3, height);
	scale(1, -1);
	stroke(255);
	strokeWeight(thicknessSld.value);
	line(0,0,0,lengthSld.value);
	
	translate(0,lengthSld.value);
	push();
	rotate(-angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value);
	drawBranch(lengthSld.value*lengthDecaySld.value  + random(-lengthRndSld.value, lengthRndSld.value)*lengthSld.value,
		thicknessSld.value*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thicknessSld.value, 1);
	pop();
	rotate(angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value);
	drawBranch(lengthSld.value*lengthDecaySld.value + random(-lengthRndSld.value, lengthRndSld.value)*lengthSld.value,
		thicknessSld.value*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thicknessSld.value, 1);
}

function drawBranch(length, thickness, depth) {
	if(depth <= maxLevelSld.value) {
		strokeWeight(thickness);
		line(0,0,0,length);
		translate(0,length);
		push();
		rotate(-angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value);
		drawBranch(length*lengthDecaySld.value  + random(-lengthRndSld.value, lengthRndSld.value)*length, 
			thickness*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thickness, depth + 1);
		pop();
		rotate(angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value);
		drawBranch(length*lengthDecaySld.value  + random(-lengthRndSld.value, lengthRndSld.value)*length,
			thickness*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thickness, depth + 1);
	}
}

function mouseDragged() {
	UI.mouseDragged();
}

function mousePressed() {
	UI.mouseClicked();
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }
