//var song;
let myShape;
let textures = [];
let currentTex;
let freezeCheck = false;
let rotNum = 0;
let gapNum = 50;
let movingCheck = false;
var button;

//function playMusic(){
//     userStartAudio();
//  if ( song.isPlaying() ) {
//    song.pause();
//  } else {
//    song.play();
//  }

//}

function preload() {
    myShape = loadModel("nv-3d.obj", true);
    
     song=loadSound('music.mp3');

    textures.push(loadImage("tex1.jpg"));
    textures.push(loadImage("tex2.jpg"));
    textures.push(loadImage("tex3.jpg"));
    textures.push(loadImage("tex4.jpg"));
    textures.push(loadImage("tex5.jpg"));
    textures.push(loadImage("tex6.jpg"));
    textures.push(loadImage("tex7.jpg"));
    textures.push(loadImage("tex8.jpg"));
    textures.push(loadImage("tex9.jpg"));
    textures.push(loadImage("tex10.jpg"));
    textures.push(loadImage("tex11.jpg"));
    textures.push(loadImage("tex12.jpg"));
    textures.push(loadImage("tex13.jpg"));
    textures.push(loadImage("tex14.jpg"));
    textures.push(loadImage("tex15.jpg"));
    textures.push(loadImage("tex16.jpg"));
    textures.push(loadImage("tex17.jpg"));
    textures.push(loadImage("tex18.jpg"));
}

function setup() {
    let canvas = createCanvas(700, 400, WEBGL);
    angleMode(DEGREES);
    canvas.parent("sketch-holder");
    currentTex = textures[0];
    changeDirection = false;

    let button = createButton('jealousy / to be jealous of');
  button.parent("button-holder");
  button.mousePressed(detailPage);
    
        
    let buttonB = createButton('Play Music');
    buttonB.mousePressed(playMusic);

    //buttonA.mousePressed(detailPage);
//
    //buttonA.position(100, 190);
    //buttonA.style("font-size", "28px");
    //buttonA.style("font-family", "Dancing Script");
//
    //// the "color" property sets the text color
    //buttonA.style("color", "darkred");
//
    //buttonA.style("background-color", "pink");
    //buttonA.style("border-color", "red");
    //buttonA.style("border-width", "3px");
//
    //// the "border-radius" property rounds
    //// the edges of the button
    //buttonA.style("border-radius", "10px");
}

function draw() {
    if (movingCheck) {
        if (gapNum > 0) {
            gapNum--;
        }
    } else if (!movingCheck) {
        if (gapNum < 50) {
            gapNum++;
        }
    }

    rotateY(rotNum * 0.45);
    if (!freezeCheck) {
        rotNum++;
    }

    lights();
    ambientLight(90);
    background(236, 238, 227);
    scale(1.3);
    translate(0, -29, 0);
    noStroke();
    rotateX(-180);
    texture(currentTex);
    model(myShape);
}

function keyPressed() {
    if (key === "c" || key === "C") {
        currentTex = random(textures);
    }
}
function mousePressed() {
    if (freezeCheck) {
        freezeCheck = false;
    } else if (!freezeCheck) {
        freezeCheck = true;
    }
}

function detailPage() {
    window.open("https://ling4mg9.github.io/web-3d-s26/project1-source/");
}

function playMusic(){
     userStartAudio();
  if ( song.isPlaying() ) { 
    song.pause();
  } else {
    song.play();
  }

}
