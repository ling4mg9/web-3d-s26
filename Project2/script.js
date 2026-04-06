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
let text = "Room Demo";
let textGeo;
let materials;
let textMesh1;
let textMesh2;
let group;

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00aad0);
    //scene.fog = new THREE.FogExp2(0xffffff, 0.001);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(innerWidth, innerHeight);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 0);

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
    
// round room shape    
const outerRadius = 200;
const innerRadius = 160;
const roomShape = new THREE.Shape();
roomShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
const hole = new THREE.Path();
hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
roomShape.holes.push(hole);
const roomGeometry = new THREE.ExtrudeGeometry(roomShape, {
  depth: 250,
  bevelEnabled: false,
  curveSegments: 130
});
const roomMaterial = new THREE.MeshPhongMaterial({
  color: 0x2F5E54
});
const tube = new THREE.Mesh(roomGeometry, roomMaterial);
//extrude z
tube.rotation.x = Math.PI / 2;
tube.position.set(0, 190, 0);
scene.add(tube);
    
//room2
    // round room shape    
const outerRadius1 = 160;
const innerRadius1 = 120;
const roomShape1 = new THREE.Shape();
roomShape1.absarc(0, 0, outerRadius1, 0, Math.PI * 2, false);
const hole1 = new THREE.Path();
hole1.absarc(0, 0, innerRadius1, 0, Math.PI * 2, true);
roomShape1.holes.push(hole1);
const roomGeometry1 = new THREE.ExtrudeGeometry(roomShape1, {
  depth: 250,
  bevelEnabled: false,
  curveSegments: 130
});
const roomMaterial1 = new THREE.MeshPhongMaterial({
  color: 0xc66bf3
});
const tube1 = new THREE.Mesh(roomGeometry1, roomMaterial1);
//extrude z
tube1.rotation.x = Math.PI / 2;
tube1.position.set(190, 190, 100);
scene.add(tube1);
 
    
    
    
    
    //stair
    const stair = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const staircase = new THREE.BoxGeometry(60, 5, 25);
    const stairs = new THREE.Mesh(staircase, stair);
    stairs.position.set(118, 12.5, -140);
    scene.add(stairs);

    const staircase1 = new THREE.BoxGeometry(60, 5, 25);
    const stairs1 = new THREE.Mesh(staircase1, stair);
    stairs1.position.set(118, 3.5, -120);
    scene.add(stairs1);

    const staircase2 = new THREE.BoxGeometry(60, 5, 25);
    const stairs2 = new THREE.Mesh(staircase2, stair);
    stairs2.position.set(118, -5.5, -100);
    scene.add(stairs2);

    const staircase3 = new THREE.BoxGeometry(60, 5, 25);
    const stairs3 = new THREE.Mesh(staircase3, stair);
    stairs3.position.set(118, -14.5, -80);
    scene.add(stairs3);

    const staircase4 = new THREE.BoxGeometry(60, 5, 25);
    const stairs4 = new THREE.Mesh(staircase4, stair);
    stairs4.position.set(118, -23.5, -60);
    scene.add(stairs4);

    const staircase5 = new THREE.BoxGeometry(60, 5, 25);
    const stairs5 = new THREE.Mesh(staircase5, stair);
    stairs5.position.set(118, -32.5, -40);
    scene.add(stairs5);

    const staircase6 = new THREE.BoxGeometry(60, 5, 25);
    const stairs6 = new THREE.Mesh(staircase6, stair);
    stairs6.position.set(118, -41.5, -20);
    scene.add(stairs6);

    const staircase7 = new THREE.BoxGeometry(60, 5, 25);
    const stairs7 = new THREE.Mesh(staircase7, stair);
    stairs7.position.set(118, -50.5, 0);
    scene.add(stairs7);

    const staircase8 = new THREE.BoxGeometry(60, 5, 25);
    const stairs8 = new THREE.Mesh(staircase8, stair);
    stairs8.position.set(118, -59.5, 20);
    scene.add(stairs8);

    const staircase9 = new THREE.BoxGeometry(60, 5, 25);
    const stairs9 = new THREE.Mesh(staircase9, stair);
    stairs9.position.set(118, -68.5, 40);
    scene.add(stairs9);

    // text
    // materials for the text
    materials = [
        new THREE.MeshPhongMaterial({ color: 0x2b0707, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xfb4e4e }) // side
    ];

    // establish font loader
    const loader = new TTFLoader();

    // use loader with desired ttf font
    loader.load("./CourierPrime-Bold.ttf", function (json) {
        font = new Font(json);
        // see create text function below
        createText();
    });

    // add resulting shapes to scene
    group = new THREE.Group();
    group.position.y = 100;

    scene.add(group);

    //// image
    //
    //// load image as a texture
    //const imgSource = new THREE.TextureLoader().load("./sun.jpeg");
    //// use loaded testure in a material
    //const imgMaterial = new THREE.MeshStandardMaterial({
    //    map: imgSource,
    //    transparent:true,
    //    roughness: 1,
    //    metalness: 1,
    //    //emissive: 0xffffff,
    //    side: THREE.DoubleSide
    //});
    //// create image shape (should be the same aspect ratio as the image)
    //const imgGeometry = new THREE.PlaneGeometry(554, 1108);
    //// apply image to shape and add to scene
    //const imgPlane = new THREE.Mesh(imgGeometry, imgMaterial);
    //imgPlane.position.set(-200, 200, -400);
    //scene.add(imgPlane);

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

    //const ambientLight = new THREE.AmbientLight(0x555555);
    //scene.add(ambientLight);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    // Start First Person Control Animations
    const time = performance.now();
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
        if (controls.object.position.y < 10) {
            velocity.y = 0;
            controls.object.position.y = 10;

            canJump = true;
        }
    }

    prevTime = time;
    // End First Person Control Animations

    //backWall.rotation.y += 0.01;

    render();
}

// Function to render the scene using the camera.
function render() {
    renderer.render(scene, camera);
}

// Function to generate text shapes
function createText() {
    // create geomtery with parameters, change parameters to test modifications
    // "text" on next line is the message to be written
    textGeo = new TextGeometry(text, {
        font: font,
        size: 20,
        depth: 10,
        curveSegments: 4,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: true
    });

    // finish making geometry
    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    // apply material to geometry
    textMesh1 = new THREE.Mesh(textGeo, materials);

    // set position and rotation
    textMesh1.position.x = centerOffset;
    textMesh1.position.z = -200;
    textMesh1.position.y = -100;
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    // add to group to be added to scene
    group.add(textMesh1);
}
