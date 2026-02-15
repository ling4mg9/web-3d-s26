let myShape;
let x;
let changeDirection;
let wireCheck = false;
let rl = 255;
let gl = 255;
let bl = 255;
//let music;

function preload() {
    myShape = loadModel("tower5.obj", true);
    myTexture = loadImage("white texture.jpg");
    myTexture2 = loadImage("concrete texture.jpeg");
}

function setup() {
    let canvas = createCanvas(600, 400, WEBGL);
    x = 1;
    changeDirection = false;
    angleMode(DEGREES);
    // canvas.parent("sketch-holder");

    let button = createButton("screenshot");
    // button.parent("button-holder");
    button.mousePressed(saveScreen);
}

function draw() {
      rotateY(frameCount * 0.2);
    fill(rl, gl, bl);
    ellipse(width / 2, height / 4, 100, 80);
    fill(0);
    ellipse(width / 2, height / 4, 20, 10);

    directionalLight(rl, gl, bl, 0, 80, 0);
    background(222, 231, 216);
    orbitControl();

    //fill(91, 28, 12);

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

    translate(x, -20, -100);
    noStroke();

    directionalLight(rl, gl, bl, 0, 20, -50);
    texture(myTexture);
    torus(90, 10);

    pop();

    //fill(94, 119, 89);
    //stroke(91, 28, 12);

texture(myTexture);
    model(myShape);
    
    
       if (wireCheck) {
        strokeWeight(1);
        stroke(0);
    } else {
        noStroke();
    }
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
         wireCheck = false;
    }
}

function saveScreen() {
    save(canvas, "tower.png");
}
