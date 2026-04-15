// Images and 3D Font Example Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-ins
import { PointerLockControls } from "./src/PointerLockControls.js";
import { Font } from "./src/FontLoader.js";
import { TTFLoader } from "./src/TTFLoader.js";
import { TextGeometry } from "./src/TextGeometry.js";

// Declaring global variables.
let camera, canvas, controls, scene, renderer;

// Variables for First Person Controls
let raycaster;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = true;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let font;
let text = "Lover's Eye";
let textGeo;
let materials;
let textMesh1;
let textMesh2;
let group;
let group2;
let group3;
let sphere;
let sphere1;
let sphere2;
let sphere3;
let sphere5;

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xecb2d1);
    //scene.fog = new THREE.FogExp2(0xffffff, 0.001);
    //scene.background = new THREE.Color(0xcfdcf2);
    scene.fog = new THREE.FogExp2(0xcfdcf2, 0.0013);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(innerWidth, innerHeight);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(30, 15, 580);

    // Setup First Person Controls
    // DO NOT TOUCH

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById("blocker");
    const instructions = document.getElementById("instructions");

    instructions.addEventListener("click", function () {
        controls.lock();
    });

    controls.addEventListener("lock", function () {
        instructions.style.display = "none";
        blocker.style.display = "none";
    });

    controls.addEventListener("unlock", function () {
        blocker.style.display = "block";
        instructions.style.display = "";
    });

    scene.add(controls.object);

    const onKeyDown = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = true;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = true;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = true;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = true;
                break;

            case "Space":
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = false;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = false;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = false;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = false;
                break;
        }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    // End First Person Controls

    // Add world geometry

    // room material
    //const wall = new THREE.MeshPhongMaterial({ color: 0x0f4563 });
    //
    //// back wall
    //const shortWall = new THREE.BoxGeometry(300, 250, 10);
    //const backWall = new THREE.Mesh(shortWall, wall);
    //backWall.position.set(0, 0, -200);
    //scene.add(backWall);
    //
    ////top wall
    //const ceiling = new THREE.BoxGeometry(300, 10, 250);
    //const topWall = new THREE.Mesh(ceiling, wall);
    //topWall.position.set(0, 150, 0);
    //scene.add(topWall);
    //
    //// side walls
    //const longWall = new THREE.BoxGeometry(10, 300, 510);
    //const leftWall = new THREE.Mesh(longWall, wall);
    //leftWall.position.set(-150, 0, 0);
    //scene.add(leftWall);
    //
    //const rightWall = new THREE.Mesh(longWall, wall);
    //rightWall.position.set(150, 0, 0);
    //scene.add(rightWall);
    //
    //// front walls
    //const frontSide = new THREE.BoxGeometry(100, 125, 10);
    //const frontLeft = new THREE.Mesh(frontSide, wall);
    //frontLeft.position.set(-100, -20, 250);
    //scene.add(frontLeft);
    //
    //const frontRight = new THREE.Mesh(frontSide, wall);
    //frontRight.position.set(100, -20, 250);
    //scene.add(frontRight);
    //
    //const frontTop = new THREE.BoxGeometry(300, 57.5, 10);
    //const frontMiddle = new THREE.Mesh(frontTop, wall);
    //frontMiddle.position.set(0, 70, 250);
    //scene.add(frontMiddle);
    //
    //// ceiling
    //
    //const cielingMat = new THREE.MeshPhongMaterial({ color: 0x73856b });
    //const cielingShape = new THREE.BoxGeometry(300, 10, 500);
    //const cielingMain = new THREE.Mesh(cielingShape, cielingMat);
    //cielingMain.position.set(0, 100, 0);
    //scene.add(cielingMain);

    //table
    const tableTopGeometry = new THREE.CylinderGeometry(80, 80, 3, 64);
    const tableTopMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcccc
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(0, 10, -300);
    scene.add(tableTop);

    //legs
    const legGeometry = new THREE.CylinderGeometry(3, 2, 80, 32);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(-50, -30, -330);
    scene.add(leg1);

    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(50, -30, -330);
    scene.add(leg2);

    const leg3 = new THREE.Mesh(legGeometry, legMaterial);
    leg3.position.set(-50, -30, -270);
    scene.add(leg3);

    const leg4 = new THREE.Mesh(legGeometry, legMaterial);
    leg4.position.set(50, -30, -270);
    scene.add(leg4);

    // circle1
    const outerRadius = 50;
    const innerRadius = 40;
    const roomShape = new THREE.Shape();
    roomShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    roomShape.holes.push(hole);
    const roomGeometry = new THREE.ExtrudeGeometry(roomShape, {
        depth: 6,
        bevelEnabled: false,
        curveSegments: 130
    });
    const roomMaterial = new THREE.MeshStandardMaterial({
        color: 0xfdff97,
        emissive: 0xfff7a0,
        emissiveIntensity: 1.5
    });
    const tube = new THREE.Mesh(roomGeometry, roomMaterial);
    tube.position.set(300, 90, -650);
    tube.rotateX(1.2);
    scene.add(tube);

    // circle2
    const outerRadius1 = 50;
    const innerRadius1 = 40;
    const roomShape1 = new THREE.Shape();
    roomShape1.absarc(0, 0, outerRadius1, 0, Math.PI * 2, false);
    const hole1 = new THREE.Path();
    hole1.absarc(0, 0, innerRadius1, 0, Math.PI * 2, true);
    roomShape1.holes.push(hole1);
    const roomGeometry1 = new THREE.ExtrudeGeometry(roomShape1, {
        depth: 6,
        bevelEnabled: false,
        curveSegments: 130
    });
    const roomMaterial1 = new THREE.MeshPhongMaterial({
        color: 0xfdff97,
        emissive: 0xfff7a0,
        emissiveIntensity: 1.5
    });
    const tube1 = new THREE.Mesh(roomGeometry1, roomMaterial1);
    tube1.position.set(300, -10, -650);
    tube1.rotateX(1.2);
    scene.add(tube1);

    //sphere
    const texture = new THREE.TextureLoader().load("./1 copy.webp");
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });
    const geometry = new THREE.SphereGeometry(20, 64, 94, 10);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(800, 67.5, -540);
    sphere.scale.set(1.5, 1.5, 1.5);
    scene.add(sphere);

    //sphere1
    const texture1 = new THREE.TextureLoader().load("./images/2.webp");
    const material1 = new THREE.MeshStandardMaterial({
        map: texture1
    });
    const geometry1 = new THREE.SphereGeometry(20, 64, 94);

    sphere1 = new THREE.Mesh(geometry, material);
    sphere1.position.set(-100, 58, -560);
    sphere1.scale.set(1.5, 1.5, 1.5);
    scene.add(sphere1);

    //sphere2
    const texture2 = new THREE.TextureLoader().load("./images/3.webp");
    const material2 = new THREE.MeshStandardMaterial({
        map: texture2
    });
    const geometry2 = new THREE.SphereGeometry(30, 64, 94);
    sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.position.set(380, 22, -180);
    sphere2.scale.set(1, 1, 1);
    scene.add(sphere2);

    //sphere3
    const texture3 = new THREE.TextureLoader().load("./images/4.webp");
    const material3 = new THREE.MeshStandardMaterial({
        map: texture3
    });
    const geometry3 = new THREE.SphereGeometry(20, 64, 94);
    sphere3 = new THREE.Mesh(geometry3, material3);
    sphere3.position.set(0, 40, -300);
    sphere3.scale.set(1, 1, 1);
    scene.add(sphere3);

    //sphere4
    const texture4 = new THREE.TextureLoader().load("./images/5.webp");
    const material4 = new THREE.MeshStandardMaterial({
        map: texture4
    });
    const geometry4 = new THREE.SphereGeometry(200, 64, 94);
    const sphere4 = new THREE.Mesh(geometry4, material4);
    sphere4.position.set(780, 12.5, -540);
    sphere4.scale.set(1, 1, 1);
    scene.add(sphere4);

    //sphere5
    const texture5 = new THREE.TextureLoader().load("./images/6.webp");
    const material5 = new THREE.MeshStandardMaterial({
        map: texture5
    });
    const geometry5 = new THREE.SphereGeometry(40, 69, 104);
    sphere5 = new THREE.Mesh(geometry5, material5);
    sphere5.position.set(300, 40, -650);
    sphere5.scale.set(1, 1, 1);
    scene.add(sphere5);
    //const sphere5 = new THREE.Mesh(geometry5, material5);
    //sphere5.position.set(300, 40, -650);
    //sphere5.scale.set(1,1,1);
    //scene.add(sphere5);

    //sphere6
    const texture6 = new THREE.TextureLoader().load("./images/7.webp");
    const material6 = new THREE.MeshStandardMaterial({
        map: texture6
    });
    const geometry6 = new THREE.SphereGeometry(19, 39, 74, 10);
    const sphere6 = new THREE.Mesh(geometry6, material6);
    sphere6.position.set(140, 40, -100);
    sphere6.scale.set(3, 2.9, 2.8);
    scene.add(sphere6);

    //sphere7
    const texture7 = new THREE.TextureLoader().load("./images/8.webp");
    const material7 = new THREE.MeshStandardMaterial({
        map: texture7
    });
    const geometry7 = new THREE.SphereGeometry(19, 39, 74, 10);
    const sphere7 = new THREE.Mesh(geometry7, material7);
    sphere7.position.set(-140, 140, -60);
    sphere7.scale.set(3, 2.9, 2.8);
    scene.add(sphere7);

    //stair
    const stair = new THREE.MeshPhongMaterial({ color: 0xfff4ce });
    const stair1 = new THREE.MeshPhongMaterial({ color: 0xcab3d5 });

    const staircase10 = new THREE.BoxGeometry(60, 5, 25);
    const stairs10 = new THREE.Mesh(staircase10, stair1);
    stairs10.position.set(800, 21.5, -540);
    stairs10.rotateY(1.5);
    scene.add(stairs10);

    const staircase = new THREE.BoxGeometry(60, 5, 25);
    const stairs = new THREE.Mesh(staircase, stair);
    stairs.position.set(780, 12.5, -540);
    stairs.rotateY(1.5);
    scene.add(stairs);

    const staircase1 = new THREE.BoxGeometry(60, 5, 25);
    const stairs1 = new THREE.Mesh(staircase1, stair1);
    stairs1.position.set(760, 3.5, -540);
    stairs1.rotateY(1.5);
    scene.add(stairs1);

    const staircase2 = new THREE.BoxGeometry(60, 5, 25);
    const stairs2 = new THREE.Mesh(staircase2, stair);
    stairs2.position.set(740, -5.5, -540);
    stairs2.rotateY(1.5);
    scene.add(stairs2);

    const staircase3 = new THREE.BoxGeometry(60, 5, 25);
    const stairs3 = new THREE.Mesh(staircase3, stair1);
    stairs3.position.set(720, -14.5, -540);
    stairs3.rotateY(1.5);
    scene.add(stairs3);

    const staircase4 = new THREE.BoxGeometry(60, 5, 25);
    const stairs4 = new THREE.Mesh(staircase4, stair);
    stairs4.position.set(700, -23.5, -540);
    stairs4.rotateY(1.5);
    scene.add(stairs4);

    const staircase5 = new THREE.BoxGeometry(60, 5, 25);
    const stairs5 = new THREE.Mesh(staircase5, stair1);
    stairs5.position.set(680, -32.5, -540);
    stairs5.rotateY(1.5);
    scene.add(stairs5);

    const staircase6 = new THREE.BoxGeometry(60, 5, 25);
    const stairs6 = new THREE.Mesh(staircase6, stair);
    stairs6.position.set(660, -41.5, -540);
    stairs6.rotateY(1.5);
    scene.add(stairs6);

    const staircase7 = new THREE.BoxGeometry(60, 5, 25);
    const stairs7 = new THREE.Mesh(staircase7, stair1);
    stairs7.position.set(640, -50.5, -540);
    stairs7.rotateY(1.5);
    scene.add(stairs7);

    const staircase8 = new THREE.BoxGeometry(60, 5, 25);
    const stairs8 = new THREE.Mesh(staircase8, stair);
    stairs8.position.set(620, -59.5, -540);
    stairs8.rotateY(1.5);
    scene.add(stairs8);

    const staircase9 = new THREE.BoxGeometry(60, 5, 25);
    const stairs9 = new THREE.Mesh(staircase9, stair1);
    stairs9.position.set(600, -68.5, -540);
    stairs9.rotateY(1.5);
    scene.add(stairs9);

    //sphere and plank
    const sphereTexture = new THREE.TextureLoader().load("./sky.jpeg");
    const sphereMaterial = new THREE.MeshStandardMaterial({
        map: sphereTexture,
        emissive: 0xff9d98,
        emissiveIntensity: 0.1
    });
    const sphereBase = new THREE.SphereGeometry(30, 64, 94, 10);
    const sphereShape = new THREE.Mesh(sphereBase, sphereMaterial);
    sphereShape.position.set(-100, -49, -560);
    sphereShape.scale.set(1.2, 1.2, 1.2);
    scene.add(sphereShape);

    const plankTexture = new THREE.TextureLoader().load("./dots.jpeg");
    const plankMaterial = new THREE.MeshStandardMaterial({
        map: plankTexture
    });
    const plank = new THREE.Mesh(staircase, plankMaterial);
    plank.position.set(-100, -13, -580);
    plank.scale.set(5, 1, 3);
    plank.rotateY(-1.5);
    plank.rotateZ(0.2);
    scene.add(plank);

    const sphereTexture1 = new THREE.TextureLoader().load("./moon.jpeg");
    const sphereMaterial1 = new THREE.MeshStandardMaterial({
        map: sphereTexture1
    });
    const sphereBase1 = new THREE.SphereGeometry(15, 64, 94, 10);
    const sphereShape1 = new THREE.Mesh(sphereBase1, sphereMaterial1);
    sphereShape1.position.set(-100, 25, -460);
    sphereShape1.scale.set(1, 1, 1);
    sphereShape1.rotateY(1.3);
    scene.add(sphereShape1);

    const sphereTexture2 = new THREE.TextureLoader().load("./glitch3.jpeg");
    const sphereMaterial2 = new THREE.MeshStandardMaterial({
        map: sphereTexture2
    });
    const sphereBase2 = new THREE.SphereGeometry(35, 64, 94, 10);
    const sphereShape2 = new THREE.Mesh(sphereBase2, sphereMaterial2);
    sphereShape2.position.set(-100, 6, -660);
    sphereShape2.scale.set(1, 1, 1);
    sphereShape2.rotateY(1.3);
    scene.add(sphereShape2);

    const plank1 = new THREE.Mesh(staircase, plankMaterial);
    plank1.position.set(-100, 42, -660);
    plank1.scale.set(5, 1, 3);
    plank1.rotateY(-1.5);
    plank1.rotateZ(-0.15);
    scene.add(plank1);

    const sphereTexture4 = new THREE.TextureLoader().load("./pink.jpeg");
    const sphereMaterial4 = new THREE.MeshStandardMaterial({
        map: sphereTexture4
    });
    const sphereBase4 = new THREE.SphereGeometry(21, 64, 94, 10);
    const sphereShape4 = new THREE.Mesh(sphereBase4, sphereMaterial4);
    sphereShape4.position.set(-100, 71, -710);
    sphereShape4.scale.set(1, 1, 1);
    sphereShape4.rotateY(1.3);
    scene.add(sphereShape4);

    //skyWall
    const skyWallTex = new THREE.TextureLoader().load("./sky1.jpeg");
    const skyWallMaterial = new THREE.MeshStandardMaterial({
        map: skyWallTex
    });
    const skyWall = new THREE.Mesh(staircase, skyWallMaterial);
    skyWall.position.set(200, 142, -960);
    skyWall.scale.set(16, 1, 35);
    skyWall.rotateX(-1.5);
    //skyWall.rotateZ(-0.15);
    scene.add(skyWall);

    //statement
    const statementTex = new THREE.TextureLoader().load("./Statement.png");
    const statementMat = new THREE.MeshStandardMaterial({
        map: statementTex
    });
    const statement = new THREE.Mesh(staircase, statementMat);
    statement.position.set(200, 13, -960);
    statement.scale.set(5.7, 0.2, 7.2);
    statement.rotateX(-1.5);
    //skyWall.rotateZ(-0.15);
    scene.add(statement);

    ////statement portal
    //const portalGeo = new THREE.PlaneGeometry(380, 340);
    //const portalMat = new THREE.MeshStandardMaterial({
    //    color: 0xffffff,
    //    emissive: 0xfff4cc,
    //    emissiveIntensity: 8
    //});
    //const portal = new THREE.Mesh(portalGeo, portalMat);
    //portal.position.set(200, 60, -958);
    //scene.add(portal);

    //plate
    const plateGeo = new THREE.SphereGeometry(40, 64, 32);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xc9dae7, emissive: 0xc9dae7, emissiveIntensity: 1 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.scale.set(1, 0.1, 1);
    plate.position.set(380, -20, -180);
    scene.add(plate);

    //原本的
    // text1
    // materials for the text
    //materials = [
    //    new THREE.MeshPhongMaterial({ color: 0xffccc9, flatShading: true }), // front
    //    new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    //];
    //
    //// establish font loader
    //const loader = new TTFLoader();
    //
    //// use loader with desired ttf font
    //loader.load("./Rubik.ttf", function (json) {
    //    font = new Font(json);
    //    // see create text function below
    //    createText();
    //});
    //
    //// add resulting shapes to scene
    //group = new THREE.Group();
    ////group.position.y = 100;
    //group.position.set(0, 200, 400);
    //scene.add(group);
    //
    //const group2 = new THREE.Group();
    //group2.position.set(0, 100, 400);
    //scene.add(group2);
    //

    // text1
    materials = [
        new THREE.MeshPhongMaterial({ color: 0xffccc9, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];

    // three new text groups
    group = new THREE.Group();
    group.position.set(0, 200, 400);
    scene.add(group);

    group2 = new THREE.Group();
    group2.position.set(0, 150, 400); // 2nd one is lower
    scene.add(group2);

    group3 = new THREE.Group();
    group3.position.set(0, 100, 400);
    scene.add(group3);

    // establish font loader
    const loader = new TTFLoader();

    // use loader with desired ttf font
    loader.load("./Rubik.ttf", function (json) {
        font = new Font(json);

        //1st row
        createText(group);

        //2nd row
        createText(group2);
        createText(group3);
    });

    //// floor tile image
    //
    //// load image as a texture
    const imgSource = new THREE.TextureLoader().load("./tile.jpeg");
    // use loaded testure in a material
    const imgMaterial = new THREE.MeshStandardMaterial({
        map: imgSource,
        transparent: true,
        //roughness: 1,
        //metalness: 1,
        //emissive: 0xffffffbb,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry = new THREE.PlaneGeometry(960, 1200);
    // apply image to shape and add to scene
    const imgPlane = new THREE.Mesh(imgGeometry, imgMaterial);
    imgPlane.rotation.x = -Math.PI / 2;
    imgPlane.position.set(200, -70, -400);
    imgSource.wrapS = THREE.RepeatWrapping;
    imgSource.wrapT = THREE.RepeatWrapping;
    imgSource.repeat.set(10, 10);
    scene.add(imgPlane);

    //grass image
    const imgSourceG = new THREE.TextureLoader().load("./grass.jpeg");
    const imgMaterialG = new THREE.MeshStandardMaterial({
        map: imgSourceG,
        transparent: true,
        //roughness: 1,
        //metalness: 1,
        //emissive: 0xffffffbb,
        side: THREE.DoubleSide
    });
    const imgGeometryG = new THREE.PlaneGeometry(7360, 13080);
    const imgPlaneG = new THREE.Mesh(imgGeometryG, imgMaterialG);
    imgPlaneG.rotation.x = -Math.PI / 2;
    imgPlaneG.position.set(200, -75, -400);
    imgSourceG.wrapS = THREE.RepeatWrapping;
    imgSourceG.wrapT = THREE.RepeatWrapping;
    imgSourceG.repeat.set(30, 30);
    scene.add(imgPlaneG);

    ////image2 caution
    const imgSource1 = new THREE.TextureLoader().load("./caution.png");
    const imgMaterial1 = new THREE.MeshStandardMaterial({
        map: imgSource1,
        transparent: true,
        emissive: 0xffccc9,
        side: THREE.DoubleSide
    });
    const imgGeometry1 = new THREE.PlaneGeometry(41.8125, 35.8925);
    const imgPlane1 = new THREE.Mesh(imgGeometry1, imgMaterial1);
    imgPlane1.position.set(-170, 9, 200);
    imgPlane1.rotation.z = Math.PI * 0.03;
    scene.add(imgPlane1);

    ////image3 caution
    const imgSource2 = new THREE.TextureLoader().load("./caution.png");
    const imgMaterial2 = new THREE.MeshStandardMaterial({
        map: imgSource2,
        transparent: true,
        emissive: 0xfeb4b0,
        side: THREE.DoubleSide
    });
    const imgGeometry2 = new THREE.PlaneGeometry(41.8125, 35.8925);
    const imgPlane2 = new THREE.Mesh(imgGeometry2, imgMaterial2);
    imgPlane2.position.set(-170, 59, 200);
    imgPlane2.rotation.z = Math.PI * 0.03;
    scene.add(imgPlane2);

    ////image4 caution
    const imgSource3 = new THREE.TextureLoader().load("./caution.png");
    const imgMaterial3 = new THREE.MeshStandardMaterial({
        map: imgSource3,
        transparent: true,
        emissive: 0xff9d98,
        side: THREE.DoubleSide
    });
    const imgGeometry3 = new THREE.PlaneGeometry(41.8125, 35.8925);
    const imgPlane3 = new THREE.Mesh(imgGeometry3, imgMaterial3);
    imgPlane3.position.set(-170, 109, 200);
    imgPlane3.rotation.z = Math.PI * 0.03;
    scene.add(imgPlane3);

    ////home icon
    const imgSource7 = new THREE.TextureLoader().load("./home.png");
    const imgMaterial7 = new THREE.MeshPhongMaterial({
        map: imgSource7,
        transparent: true,
opacity: 0.5,
        emissive: 0xfdff97,
        side: THREE.DoubleSide
    });
    const imgGeometry7 = new THREE.PlaneGeometry(1350,1104);
    const imgPlane7 = new THREE.Mesh(imgGeometry7, imgMaterial7);
    imgPlane7.position.set(200, 380, 200);
    scene.add(imgPlane7);
    
    ////image question mark 1
    const imgSource4 = new THREE.TextureLoader().load("./question_mark.png");
    const imgMaterial4 = new THREE.MeshStandardMaterial({
        map: imgSource4,
        transparent: true,
        emissive: 0xa3e2d2,
        side: THREE.DoubleSide
    });
    const imgGeometry4 = new THREE.PlaneGeometry(65.0, 55.7);
    const imgPlane4 = new THREE.Mesh(imgGeometry4, imgMaterial4);
    imgPlane4.position.set(-170, 89, 201);
    imgPlane4.rotation.z = Math.PI * 0.2;
    scene.add(imgPlane4);

    ////image question mark 2
    const imgSource5 = new THREE.TextureLoader().load("./question_mark.png");
    const imgMaterial5 = new THREE.MeshStandardMaterial({
        map: imgSource5,
        transparent: true,
        emissive: 0xa3e2d2,
        side: THREE.DoubleSide
    });
    const imgGeometry5 = new THREE.PlaneGeometry(100.0, 90.7);
    const imgPlane5 = new THREE.Mesh(imgGeometry5, imgMaterial5);
    imgPlane5.position.set(150, 19, 201);
    imgPlane5.rotation.z = Math.PI * -0.2;
    scene.add(imgPlane5);

    ////image question mark 3
    const imgSource6 = new THREE.TextureLoader().load("./question_mark.png");
    const imgMaterial6 = new THREE.MeshStandardMaterial({
        map: imgSource6,
        transparent: true,
        emissive: 0xa3e2d2,
        side: THREE.DoubleSide
    });
    const imgGeometry6 = new THREE.PlaneGeometry(40.0, 30);
    const imgPlane6 = new THREE.Mesh(imgGeometry6, imgMaterial6);
    imgPlane6.position.set(-70, -29, 201);
    //imgPlane6.rotation.z = Math.PI * -0.2;
    scene.add(imgPlane6);

    // Ground
    const earth = new THREE.PlaneGeometry(4000, 4000);
    const ground = new THREE.MeshPhongMaterial({ color: 0x5d734e, flatShading: true });
    const mesh2 = new THREE.InstancedMesh(earth, ground, 500);
    mesh2.translateY(-80);
    mesh2.rotateX(-1.5708);
    scene.add(mesh2);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    // Start First Person Control Animations
    const time = performance.now();

    if (sphere) {
        sphere.rotation.y += 0.009;
        sphere.rotation.x += 0.008;
    }
    if (sphere1) {
        sphere1.rotation.y += 0.004;
        //sphere3.rotation.x += 0.008;
    }
    if (sphere2) {
        sphere2.rotation.x += 0.001;
        sphere2.rotation.y += 0.007;
    }

    if (sphere3) {
        sphere3.rotation.y += 0.009;
        sphere3.rotation.x += 0.002;
    }

    if (sphere5) {
        sphere5.rotation.y += 0.009;
        sphere5.rotation.x += 0.002;
    }

    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 1800.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 1800.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        // jump fix
        controls.object.position.y += velocity.y * delta;
        if (controls.object.position.y < 5) {
            velocity.y = 0;
            controls.object.position.y = 5;

            canJump = true;
        }
    }

    prevTime = time;
    // End First Person Control Animations

    //plank1.rotation.y += 0.01;

    render();
}

// Function to render the scene using the camera.
function render() {
    renderer.render(scene, camera);
}

//原本的
// Function to generate text shapes
//function createText() {
//    // create geomtery with parameters, change parameters to test modifications
//    // "text" on next line is the message to be written
//    textGeo = new TextGeometry(text, {
//        font: font,
//        size: 30,
//        depth: 10,
//        curveSegments: 9,
//        bevelThickness: 1,
//        bevelSize: 1.5,
//        bevelEnabled: true
//    });
//
//    // finish making geometry
//    textGeo.computeBoundingBox();
//    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
//
//    // apply material to geometry
//    textMesh1 = new THREE.Mesh(textGeo, materials);
//
//    // set position and rotation
//    textMesh1.position.x = centerOffset;
//    textMesh1.position.z = -200;
//    textMesh1.position.y = -100;
//    textMesh1.rotation.x = 0;
//    textMesh1.rotation.y = Math.PI * 2;
//    textMesh1.rotation.z = Math.PI * 0.03;
//
//    // add to group to be added to scene
//    group.add(textMesh1);
//}

function createText(targetGroup) {
    textGeo = new TextGeometry(text, {
        font: font,
        size: 30,
        depth: 10,
        curveSegments: 9,
        bevelThickness: 1,
        bevelSize: 1.5,
        bevelEnabled: true
    });

    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    const textMesh = new THREE.Mesh(textGeo, materials);

    textMesh.position.x = centerOffset;
    textMesh.position.z = -200;
    textMesh.position.y = -100;
    textMesh.rotation.x = 0;
    textMesh.rotation.y = Math.PI * 2;
    textMesh.rotation.z = Math.PI * 0.03;

    targetGroup.add(textMesh);
}
