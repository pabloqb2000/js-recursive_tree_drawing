let angleSld, angleRndSld;
let lengthSld, lengthRndSld;
let thicknessSld, thicknessRndSld;
let lengthDecaySld, thicknessDecaySld;
let seedSld, maxLevelSld;
let color1, color2;
let lerpBtn, windBtn;
let windSpeedSld, windStrengthSld;
let frame = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Set up the sliders
	angleSld = new Slider(start=0, end=PI/2, value=PI/6, 0, 0, width/12, height/60, null, "Angle");
	angleRndSld = new Slider(start=0, end=1, value=0.2, 0, 0, width/12, height/60, null, "Angle Randomness");

	lengthSld = new Slider(start=height/10, end=height/2, value=height/5, 0, 0, width/12, height/60, null, "Initial lenght");
	lengthRndSld = new Slider(start=0, end=0.5, value=0.2, 0, 0, width/12, height/60, null, "Length Randomness");

	thicknessSld = new Slider(start=1, end=15, value=4, 0, 0, width/12, height/60, null, "Thickness");
	thicknessRndSld = new Slider(start=0, end=0.3, value=0.2, 0, 0, width/12, height/60, null, "Thickness Randomness");

	lengthDecaySld = new Slider(start=0.1, end=1, value=0.7, 0, 0, width/12, height/60, null, "Length decay", true, 2);
	thicknessDecaySld = new Slider(start=0.1, end=1, value=0.8, 0, 0, width/12, height/60, null, "Thickness decay", true, 2);

	seedSld = new Slider(start=1, end=100, value=19, 0, 0, width/12, height/60, 1, "Random seed", true, 0);
	maxLevelSld = new Slider(start=1, end=10, value=5, 0, 0, width/12, height/60, 1, "Max depth level", true, 0);

	windSpeedSld = new Slider(start=0, end=5, value=0.8, 0, 0, width/12, height/60, null, "Wind speed");
	windStrengthSld = new Slider(start=0, end=4, value=1, 0, 0, width/12, height/60, null, "Wind strength");

	color1 = new ColorPicker(0,0,width/12, height/30, "#743E01");
	color2 = new ColorPicker(0,0,width/12, height/30, "#B0F3AF");

	lerpBtn = new ToggleButton(0,0,width/12, height/30, "LERP");
	windBtn = new ToggleButton(0,0,width/12, height/30, "Wind");

	// Set up the UI
	UI.heightMargin = height/30;
	UI.tableWidth = 2;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	randomSeed(seedSld.value);
	background(32);

	// Update UI
	UI.update();
	UI.draw();

	// Drew tree
	drawTree();
	colorMode(RGB, 255);
	frame++;
}

function drawTree() {
	// Draw main branch
	translate(2*width/3, height);
	scale(1, -1);
	colorMode(HSL, 1);
	let color = color1.getColor();
	stroke(color);
	strokeWeight(thicknessSld.value);
	line(0,0,0,lengthSld.value);
	translate(0,lengthSld.value);

	// Calculate wind
	let wind = windBtn.active ? angleSld.value*(noise(frame/200*windSpeedSld.value)*2-1)/
		thicknessSld.value*windStrengthSld.value : 0;

	// Draw first brach
	push();
	rotate(-angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value + wind);
	drawBranch(lengthSld.value*lengthDecaySld.value  + random(-lengthRndSld.value, lengthRndSld.value)*lengthSld.value,
		thicknessSld.value*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thicknessSld.value, 1);
	// Draw second branch
	pop();
	rotate(angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value + wind);
	drawBranch(lengthSld.value*lengthDecaySld.value + random(-lengthRndSld.value, lengthRndSld.value)*lengthSld.value,
		thicknessSld.value*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thicknessSld.value, 1);
}

function drawBranch(length, thickness, depth) {
	if(depth <= maxLevelSld.value) {
		// Set color
		let color;
		if(lerpBtn.active) {
			let c1 = color1.getColor();
			let c2 = color2.getColor();
			color = lerpColor(c1, c2, (depth / maxLevelSld.value)**2);
		} else {
			color = depth > ceil(maxLevelSld.value / 2) ? color2.getColor() : color1.getColor();
		}
		stroke(color);

		strokeWeight(thickness);
		line(0,0,0,length);
		translate(0,length);

		// Calculate wind
		let wind = windBtn.active ? angleSld.value*(noise(frame/200*windSpeedSld.value)*2-1)
			/thickness*windStrengthSld.value : 0;

		// Draw first branch
		push();
		rotate(-angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value + wind);
		drawBranch(length*lengthDecaySld.value  + random(-lengthRndSld.value, lengthRndSld.value)*length, 
			thickness*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thickness, depth + 1);
		// Draw second brach
		pop();
		rotate(angleSld.value + random(-angleRndSld.value, angleRndSld.value)*angleSld.value + wind);
		drawBranch(length*lengthDecaySld.value  + random(-lengthRndSld.value, lengthRndSld.value)*length,
			thickness*thicknessDecaySld.value  + random(-thicknessRndSld.value, thicknessRndSld.value)*thickness, depth + 1);
	}
}
