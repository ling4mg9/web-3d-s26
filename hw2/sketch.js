function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(0, 12, 64);
    fill(255, 255, 255);
    noStroke(0);
    orbitControl();

    cylinder(30, 10, 24, 1, 1);
     translate(0, 0, 70);
    rotateX(30);
    cylinder(30, 10, 24, 1, 1);
    translate(0, 0, 70);
    rotateX(-40);
    cylinder(25, 8, 24, 1, 1);
    translate(0, 0, 70);
    rotateX(30);
    cylinder(20, 6, 20, 1, 1);
    translate(0, 0, 70);
    rotateX(-50);
    cylinder(15, 4, 18, 1, 1);
     translate(0, 0, 70);
    rotateX(50);
    cylinder(10, 2, 18, 1, 1);
    
    cylinder(300, 20, 24, 1, false, false);
    translate(0,80,80);
     cylinder(260, 20, 24, 1, false, false);
     translate(0,80,80);
     cylinder(220, 20, 24, 1, false, false);
    translate(0,80,80);
     cylinder(180, 20, 24, 1, false, false);
}
