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
let text = "type while you move";
let textGeo;
let materials;
let textMesh1;
let textMesh2;
let group;
let fadingCubes = [];

const colors = [
    0x8BE8CB,
    0x7ea2aa,
    0x888da7,
    0x9c7a97,
    0x303633
];
// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0208);
    scene.fog = new THREE.FogExp2(0x2E1E2B, 0.001);
    renderer = new THREE.WebGLRenderer({ antialias: true });
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

    if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
        newCube();
    }

    switch (event.code) {
        case "ArrowUp":
            moveForward = true;
            break;

        case "ArrowLeft":
            moveLeft = true;
            break;

        case "ArrowDown":
            moveBackward = true;
            break;

        case "ArrowRight":
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
                moveForward = false;
                break;

            case "ArrowLeft":
                moveLeft = false;
                break;

            case "ArrowDown":
                moveBackward = false;
                break;

            case "ArrowRight":
                moveRight = false;
                break;
        }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);



    // text1
    materials = [
        new THREE.MeshPhongMaterial({ color: 0x2E1E2B, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0x182B1C }) // side
    ];

    // three new text groups
    group = new THREE.Group();
    group.position.set(0, 200, 400);
    scene.add(group);
//
//    group2 = new THREE.Group();
//    group2.position.set(0, 150, 400); // 2nd one is lower
//    scene.add(group2);
//
//    group3 = new THREE.Group();
//    group3.position.set(0, 100, 400);
//    scene.add(group3);

    // establish font loader
    const loader = new TTFLoader();

    // use loader with desired ttf font
    loader.load("./Rubik.ttf", function (json) {
        font = new Font(json);

        //1st row
        createText(group);

        //2nd row
        //createText(group2);
        //createText(group3);
    });

    //// floor tile image
    //
    //// load image as a texture
    //const imgSource = new THREE.TextureLoader().load("./tile1.jpeg");
    //// use loaded testure in a material
    //const imgMaterial = new THREE.MeshStandardMaterial({
    //    map: imgSource,
    //    transparent: true,
    //    //roughness: 1,
    //    //metalness: 1,
    //    //emissive: 0xffffffbb,
    //    side: THREE.DoubleSide
    //});
    //// create image shape (should be the same aspect ratio as the image)
    //const imgGeometry = new THREE.PlaneGeometry(960, 1200);
    //// apply image to shape and add to scene
    //const imgPlane = new THREE.Mesh(imgGeometry, imgMaterial);
    //imgPlane.rotation.x = -Math.PI / 2;
    //imgPlane.position.set(200, -70, -400);
    //imgSource.wrapS = THREE.RepeatWrapping;
    //imgSource.wrapT = THREE.RepeatWrapping;
    //imgSource.repeat.set(10, 10);
    //scene.add(imgPlane);

    //grass image
    const imgSourceG = new THREE.TextureLoader().load("./land3.jpeg");
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

    
    // Ground
    //const earth = new THREE.PlaneGeometry(4000, 4000);
    //const ground = new THREE.MeshPhongMaterial({ color: 0x5d734e, flatShading: true });
    //const mesh2 = new THREE.InstancedMesh(earth, ground, 500);
    //mesh2.translateY(-80);
    //mesh2.rotateX(-1.5708);
    //scene.add(mesh2);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    //const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    //dirLight2.position.set(-1, -1, -1);
    //scene.add(dirLight2);
//
    //const ambientLight = new THREE.AmbientLight(0xffffff);
    //scene.add(ambientLight);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    // Start First Person Control Animations
    const time = performance.now();

  //cube fade
const now = performance.now();


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



function createText(targetGroup) {
    textGeo = new TextGeometry(text, {
        font: font,
        size: 36,
        depth: 13,
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
    textMesh.position.y = -50;
    textMesh.rotation.x = 0;
    textMesh.rotation.y = Math.PI * 2;
    textMesh.rotation.z = Math.PI * 0.03;

    targetGroup.add(textMesh);
}



function newCube() {

    const myShape = new THREE.BoxGeometry(5, 10, 0.2);

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

 const cubeMat = new THREE.MeshStandardMaterial({
    emissive: randomColor,   
    emissiveIntensity: 1.5,    
    transparent: true,
    opacity: 0.6
});

    const myCube = new THREE.Mesh(myShape, cubeMat);


    myCube.position.copy(camera.position);
    myCube.rotation.copy(camera.rotation);

    myCube.updateMatrix();

    myCube.translateZ(-30);

    scene.add(myCube);

    console.log("cube added");

    // cube fade
    setTimeout(() => {
        let fade = setInterval(() => {

            cubeMat.opacity -= 0.05;

//float up
            myCube.position.y += 0.1;
myCube.position.x += 0.05;
 myCube.position.z += 0.1;
            if (cubeMat.opacity <= 0) {

                clearInterval(fade);
                scene.remove(myCube);
            }
        }, 5); }, 3000);

}