let sld;
let btn;
let tggl;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);
	sld = new Slider(start=0, end=255, value=32, 20, 20, 100, 10, null, "Background");
	btn = new Button(x=20, y=50, width=100, height=20, "Reset", resetValue);
	tggl = new ToggleButton(20,80,100,20,"Discrete", discretice);
}

function draw() {
	background(sld.value);
	UI.update();
	UI.draw();
	translate(width/2, height/2);
}

function resetValue() {
	sld.value = 32;
}

function discretice() {
	sld.step = (sld.step == null ? 20 : null);
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
