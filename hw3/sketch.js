let myShape;
let lightZ = 100;
let myTexture;
function preload() {
  myTexture = loadImage('rust.jpeg');
    myTexture2 = loadImage("pearl.jpeg");
}

function setup() {
    let canvas = createCanvas(600, 400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    orbitControl();
    fill(255, 192, 0);
    noStroke();
    rotateZ(90);
    lights();
    ambientLight(0,12,64);

    

 directionalLight(
 255,85,0, // color
  1, 1, 02 // direction
  );
   texture(myTexture);
    rotateX(frameCount * 0.5);
    cylinder(3, 200);
    translate(55, 0, 0);
    cylinder(3, 150);
    translate(57, 0, 0);
    rotateZ(90);
    cylinder(3, 220);

    fill(255);
    translate(0, -98, 0);
    
    push();
      emissiveMaterial(185, 135, 91);
    box(210, 8, 100);
    pop();
    
    translate(0, -6, 0);
    fill(134, 94, 65);
    box(180, 14, 70);
    fill(0,12,64);
    translate(0,15,0);


push();
    emissiveMaterial(185, 135, 91);
    translate(36,20,6);
 texture(myTexture2);
    for(let i=0;i<32;i++){
        translate(0,4,0);
        sphere(2);
    }
    
    translate(0,-79,-10);
    for(let i=0;i<20;i++){
        translate(0,4,0);
        sphere(2);
    }
    
    
    translate(0,3,2);
    sphere(2);
    
    translate(0,1,3);
    sphere(2);

    
    translate(0,-2,2);
    sphere(2);
    
    pop();




    //shininess();
    //specularMaterial();
    //filter(POSTERIZE,2);
    // filter(BLUR,3);
}
