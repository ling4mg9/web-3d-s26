let myShape;
let textures = [];
let currentTex;
let freezeCheck = false;
let rotNum = 0;
let gapNum = 50;
let movingCheck = false;
var button;
function preload() {
    myShape = loadModel("nv-3d.obj", true);
     myTexture = loadImage("tex1.jpg");
}
function setup() {
  let canvas = createCanvas(windowWidth,windowHeight, WEBGL);
    angleMode(DEGREES);


}

function draw() {
    //if (movingCheck) {
    //    if (gapNum > 0) {
    //        gapNum--;
    //    }
    //} else if (!movingCheck) {
    //    if (gapNum < 50) {
    //        gapNum++;
    //    }
    //}

    rotateY(rotNum * 0.45);
    if (!freezeCheck) {
        rotNum++;
    }

    lights();
    ambientLight(90);
    background(0,16,0);
    scale(2.3);
    translate(0, -29, 0);
    noStroke();
    rotateX(-180);
    texture(myTexture);
    model(myShape);
   filter(BLUR, 19);
    //filter(INVERT);

}