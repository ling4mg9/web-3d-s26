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

    song = loadSound("music.mp3");

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

    let buttonA = createButton("jealousy/to be jealous of");
    buttonA.parent("button-holder1");
    buttonA.mousePressed(detailPage);

    let buttonB = createButton("rape/to fornicate/to defile/adultery");
    buttonB.parent("button-holder2");
    buttonB.mousePressed(detailPage2);

    let buttonC = createButton("avaricious");
    buttonC.parent("button-holder3");
    buttonC.mousePressed(detailPage3);

    let buttonD = createButton("witch/devil/enchanting /monster/phantom");
    buttonD.parent("button-holder4");
    buttonD.mousePressed(detailPage4);

    let buttonE = createButton("to flatter/charming");
    buttonE.parent("button-holder5");
    buttonE.mousePressed(detailPage5);

    let buttonF = createButton("absurd/fantastic/ presumptuous/rash");
    buttonF.parent("button-holder6");
    buttonF.mousePressed(detailPage6);

    let buttonG = createButton("to hinder/harm");
    buttonG.parent("button-holder7");
    buttonG.mousePressed(detailPage7);

    let buttonH = createButton("dislike/suspicion/ resentment/enmity");
    buttonH.parent("button-holder8");
    buttonH.mousePressed(detailPage8);

    let buttonI = createButton("to tease/to disturb");
    buttonI.parent("button-holder9");
    buttonI.mousePressed(detailPage9);

    let buttonJ = createButton("ugly woman");
    buttonJ.parent("button-holder10");
    buttonJ.mousePressed(detailPage10);

    let buttonK = createButton("whore/prostitute");
    buttonK.parent("button-holder11");
    buttonK.mousePressed(detailPage11);

    let buttonL = createButton("satisfactory/appropriate");
    buttonL.parent("button-holder12");
    buttonL.mousePressed(detailPage12);

    let buttonM = createButton("slave girl/maid servant");
    buttonM.parent("button-holder13");
    buttonM.mousePressed(detailPage13);
    
    let buttonN = createButton("slave/servant");
    buttonN.parent("button-holder14");
    buttonN.mousePressed(detailPage14);
    
        let buttonO = createButton("prostitute/harlot");
    buttonO.parent("button-holder15");
    buttonO.mousePressed(detailPage15);
    
            let buttonP = createButton("jealous/envious");
    buttonP.parent("button-holder16");
    buttonP.mousePressed(detailPage16);
    
                let buttonQ = createButton("to visit a prostitute");
    buttonQ.parent("button-holder17");
    buttonQ.mousePressed(detailPage17);
    
                    let buttonR = createButton("to be a mistress or lover/illicit sexual relations");
    buttonR.parent("button-holder18");
    buttonR.mousePressed(detailPage18);
    
                        let buttonS = createButton("obscene/licentious/lewd");
    buttonS.parent("button-holder19");
    buttonS.mousePressed(detailPage19);
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

function detailPage2() {}

function detailPage3() {}

function detailPage4() {}

function detailPage5() {}

function detailPage6() {}

function detailPage7() {}

function detailPage8() {}

function detailPage9() {}

function detailPage10() {}

function detailPage11() {}

function detailPage12() {}

function detailPage13() {}

function detailPage14() {}

function detailPage15() {}

function detailPage16() {}

function detailPage17() {}

function detailPage18() {}

function detailPage19() {}