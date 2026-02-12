let myShape;
let x;
let changeDirection;
let wireCheck = false;
let rl;
let gl;
let bl;

function preload() {
    myShape = loadModel("tower5.obj", true);
}

function setup() {
    let canvas = createCanvas(600, 400, WEBGL);
    x = 1;
    changeDirection = false;
    angleMode(DEGREES);
    // canvas.parent("sketch-holder");
}

function draw() {
    fill(rl,gl,bl);
    ellipse(width / 2, height / 4, 100, 80);
    fill(0);
    ellipse(width / 2, height / 4, 20, 10);

    directionalLight(
      rl,gl,bl,
        //1,
        //1,
        //02 // direction
    );
    background(0, 231, 216);
    orbitControl();

    fill(91, 28, 12);

    push();
    if (x > 200) {
        changeDirection = true;
    } else if (x <= 100) {
        changeDirection = false;
    }

    if (x >= 100 && changeDirection == false) {
        x = x + 1;
    } else if (changeDirection == true) {
        x = x - 1;
    }

    translate(x, 0, -100);
    noStroke();

    torus(90, 10);

    pop();

    fill(94, 119, 89);
    stroke(91, 28, 12);

    model(myShape);
}

function keyPressed() {
    if (key == "w") {
        if (wireCheck) {
            wireCheck = false;
        } else if (!wireCheck) {
            wireCheck = true;
        }
    } else if (key == "l") {
        rl = random(255);
        gl = random(255);
        bl = random(255);
    }
}
