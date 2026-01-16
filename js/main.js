// IMPORTS
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// GLTF LOADER CASINO
const loader = new GLTFLoader(); // Create a GLTF loader instance

loader.load("../assets/gameready_casino_scene.glb", function (gltf) {
  // Load a glTF resource
  const model = gltf.scene; // Extract the scene from the loaded glTF

  // Set model position, scale, and rotation
  model.position.set(1570, 1050, 0);
  model.scale.set(3, 3, 3);
  model.rotation.set(0, 0, 0);

  // Add the model to the scene
  scene.add(model);
});

const scene = new THREE.Scene(); // Create a new Three.js scene

const camera = new THREE.PerspectiveCamera( // Create a perspective camera
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 181, 300);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // Create a WebGL renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#4E6BA6");
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// TEXTURES
let textureSkinRoulette = new THREE.TextureLoader().load("../images/skin.jpg");
let textureSlots = new THREE.TextureLoader().load("../images/slots.png");
textureSlots.wrapS = THREE.RepeatWrapping;
textureSlots.wrapT = THREE.RepeatWrapping;
textureSlots.center.set(0.5, 0.58);
textureSlots.repeat.set(0.5, 0.5);

// CYLINDER PIVOT - BASE OF THE ROULETTE
const cylinder1Pivot = new THREE.Object3D();
cylinder1Pivot.position.set(0, 506, 0);
cylinder1Pivot.rotation.z = Math.PI / 2;
cylinder1Pivot.rotation.x = Math.PI / 2;
cylinder1Pivot.rotation.y = -Math.PI / 2;
scene.add(cylinder1Pivot);

// CYLINDER - BASE OF THE ROULETTE
let cylinder1Geometry = new THREE.CylinderGeometry(150, 150, 22, 60);
let cylinder1Material = new THREE.MeshPhongMaterial({
  // ROULETTE SKIN
  wireframe: false,
  map: textureSkinRoulette,
  specular: 0x333333,
  shininess: 1000,
});
let cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
// LIGHTS AND SHADOWS
cylinder1.castShadow = true;
cylinder1.receiveShadow = true;
cylinder1Pivot.add(cylinder1);
cylinder1.rotation.x = Math.PI / 2;

// ROULETTE BACK - CAPE
const shape = new THREE.Shape();
shape.moveTo(-120, 0);
// Bezier curve control points
shape.quadraticCurveTo(-90, -150, -30, -250);
shape.quadraticCurveTo(0, -280, 30, -250);
shape.quadraticCurveTo(90, -150, 120, 0);

const extrudeSettings = { depth: 6, bevelEnabled: false };
const capeGeo2 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
capeGeo2.translate(0, 0, -3);

const capeMat2 = new THREE.MeshLambertMaterial({
  color: "#e77575",
  flatShading: true,
});

const cape2 = new THREE.Mesh(capeGeo2, capeMat2);
cape2.position.set(0, 50, -13);
cape2.rotation.x = Math.PI / 18;

cylinder1Pivot.add(cape2);

// ROULETTE BACK - CAPE INTERLIGATION
const capeInterligationGeo = new THREE.CylinderGeometry(3, 3, 240, 20);
const capeInterligationMat = new THREE.MeshLambertMaterial({
  color: "#e77575",
  flatShading: true,
});
const capeInterligation = new THREE.Mesh(
  capeInterligationGeo,
  capeInterligationMat
);
capeInterligation.position.set(0, 0, 0);
cape2.add(capeInterligation);
capeInterligation.rotation.z = Math.PI / 2;

// CIRCLE 1 PIVOT - FRONT OF THE ROULETTE
const circle1Pivot = new THREE.Object3D();
circle1Pivot.position.set(0, 0, 12);
cylinder1Pivot.add(circle1Pivot);

// CIRCLE 1 - FRONT OF THE ROULETTE
let circle1Geometry = new THREE.CircleGeometry(135, 60);
let circle1Material = new THREE.MeshBasicMaterial({
  wireframe: false,
  // SLOTS - SLOTS OF THE ROULETTE
  map: textureSlots,
  color: new THREE.Color(0.5, 0.5, 0.5),
});
let circle1 = new THREE.Mesh(circle1Geometry, circle1Material);
circle1Pivot.add(circle1);

// CIRCLER 2 PIVOT - INNER CIRCLE
const circle2Pivot = new THREE.Object3D();
circle2Pivot.position.set(0, 0, 0.75);
circle1Pivot.add(circle2Pivot);

// CIRCLE 2 - INNER CIRCLE
let circle2Geometry = new THREE.CircleGeometry(32, 60);
let circle2Material = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureSkinRoulette,
});
let circle2 = new THREE.Mesh(circle2Geometry, circle2Material);
circle2Pivot.add(circle2);

// POINTER STOPPER PIVOT
const pointerStopperPivot = new THREE.Object3D();
pointerStopperPivot.position.set(0, 0, 2);
circle1.add(pointerStopperPivot);
pointerStopperPivot.rotation.z = Math.PI / 16;

// POINTER STOPPER
const pointerStopperGeometry = new THREE.CylinderGeometry(3, 3, 15, 60);
const pointerStopperMaterial = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureSkinRoulette,
});
const stopperCount = 16;
const stopperRadius = 120;

// Create multiple stoppers around the pointer stopper pivot
for (let i = 0; i < stopperCount; i++) {
  const angle = (i / stopperCount) * Math.PI * 2;
  const stopper = new THREE.Mesh(
    pointerStopperGeometry,
    pointerStopperMaterial
  );
  stopper.position.set(
    Math.cos(angle) * stopperRadius, // X position
    Math.sin(angle) * stopperRadius, // Y position
    0
  );
  stopper.rotation.x = Math.PI / 2;
  pointerStopperPivot.add(stopper);
}

// POINTER ARM PIVOT
const pointerArmPivot = new THREE.Object3D();
pointerArmPivot.position.set(0, 69.95, -8);
cylinder1Pivot.add(pointerArmPivot);

// POINTER PIVOT
const pointerPivot = new THREE.Object3D();
pointerPivot.position.set(0, 10, 20);
pointerArmPivot.add(pointerPivot);

// POINTER OF THE ROULETTE
let pointerGeometry = new THREE.CylinderGeometry(1, 4, 25, 5);
let pointerMaterial = new THREE.MeshPhongMaterial({
  wireframe: false,
  color: "#b57d7d",
});
let pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
pointerPivot.add(pointer);
pointer.rotation.x = Math.PI;
pointer.position.set(0, 55, 4);

// POINTER ARM
let pointerArmGeometry = new THREE.BoxGeometry(40, 20, 3);
let pointerArmMaterial = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureSkinRoulette,
});
let pointerArm = new THREE.Mesh(pointerArmGeometry, pointerArmMaterial);
pointerPivot.add(pointerArm);
pointerArm.rotation.x = Math.PI / 2;
pointerArm.position.set(0, 67.2, 0);

// ARTICULATED OBJECTS - EYE
const eyePivot = new THREE.Object3D();
eyePivot.position.set(0, 0, 0);
circle2.add(eyePivot);

function createEye() {
  const eyeGeom = new THREE.SphereGeometry(22, 16, 8); // Create a sphere geometry for the eye
  eyeGeom.computeVertexNormals(); // Ensure normals are computed for proper shading

  const eyeMat = new THREE.MeshLambertMaterial({
    color: "#ffffff",
    flatShading: true,
    wireframe: false,
  });
  eyeMat.needsUpdate = true;

  return new THREE.Mesh(eyeGeom, eyeMat);
}
const eyeMesh = createEye();
eyePivot.add(eyeMesh);

// EYEBROW
const eyebrowPivot = new THREE.Object3D();
eyebrowPivot.position.set(0, 30, 6);
eyePivot.add(eyebrowPivot);

function createEyebrow() {
  const eyebrowGeometry = new THREE.BoxGeometry(50, 6, 6);
  const eyebrowMaterial = new THREE.MeshLambertMaterial({
    color: "#ffffff",
    wireframe: false,
  });
  const eyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  return eyebrow;
}
const eyebrowMesh = createEyebrow();
eyebrowPivot.add(eyebrowMesh);

// (SOME OF THE FUNCTIONS ARE NOT COMPLETELY USED)
// ARTICULATED OBJECTS - ARMS
const armsBasePivot = new THREE.Object3D();
armsBasePivot.position.set(0, -30, -12);
circle2.add(armsBasePivot);

function createArmsBase(offsetX, offsetY) {
  // ARTICULATED OBJECTS - ARMS BASE
  const armsBaseGeo = new THREE.CylinderGeometry(14, 8, 10, 8, true);
  const armsBaseMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    color: "#FFFFFF",
    flatShading: true,
  });
  const armsBase = new THREE.Mesh(armsBaseGeo, armsBaseMat);
  armsBase.position.x = offsetX;
  armsBase.position.y = offsetY;
  return armsBase;
}
const leftArmBase = createArmsBase(-153, 15);
leftArmBase.rotation.z = -Math.PI / 2.2;
const rightArmBase = createArmsBase(153, 15);
rightArmBase.rotation.z = Math.PI / 2.2;
armsBasePivot.add(leftArmBase, rightArmBase);

const armsBasePivot2 = new THREE.Object3D();
armsBasePivot2.position.set(0, 0, 0);
armsBasePivot.add(armsBasePivot2);

function createArmsBase2(offsetX, offsetY) {
  // ARTICULATED OBJECTS - SHOULDERS
  const armsBaseGeo2 = new THREE.SphereGeometry(10, 8, 6);
  const armsBaseMat2 = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    map: textureSkinRoulette,
  });
  const armsBase2 = new THREE.Mesh(armsBaseGeo2, armsBaseMat2);
  armsBase2.position.x = offsetX;
  armsBase2.position.y = offsetY;
  return armsBase2;
}
const leftArmBase2 = createArmsBase2(-164.5, 14);
const rightArmBase2 = createArmsBase2(164.5, 14);
armsBasePivot2.add(leftArmBase2, rightArmBase2);

function createArmsBase3(offsetX, offsetY, offsetZ) {
  // ARTICULATED OBJECTS - UPPER ARMS
  const armsBaseGeo3 = new THREE.BoxGeometry(50, 10, 10);
  const armsBaseMat3 = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    map: textureSkinRoulette,
  });
  const armsBase3 = new THREE.Mesh(armsBaseGeo3, armsBaseMat3);
  armsBase3.position.x = offsetX;
  armsBase3.position.y = offsetY;
  armsBase3.position.z = offsetZ;
  return armsBase3;
}
const leftArmBase3 = createArmsBase3(-20, -10, 3);
leftArmBase3.rotation.z = Math.PI / 6;
leftArmBase3.rotation.x = -Math.PI / 12;
const rightArmBase3 = createArmsBase3(20, -10, 3);
rightArmBase3.rotation.z = -Math.PI / 6;
rightArmBase3.rotation.x = -Math.PI / 12;
leftArmBase2.add(leftArmBase3);
rightArmBase2.add(rightArmBase3);

const armsBasePivot4 = new THREE.Object3D();
armsBasePivot4.position.set(0, -30, -12);
armsBasePivot2.add(armsBasePivot4);

function createArmsBase4(offsetX, offsetY, offsetZ) {
  // ARTICULATED OBJECTS - ELBOWS
  const armsBaseGeo4 = new THREE.SphereGeometry(10, 8, 6);
  const armsBaseMat4 = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    map: textureSkinRoulette,
  });
  const armsBase4 = new THREE.Mesh(armsBaseGeo4, armsBaseMat4);
  armsBase4.position.x = offsetX;
  armsBase4.position.y = offsetY;
  armsBase4.position.z = offsetZ;
  return armsBase4;
}

const leftArmBase4 = createArmsBase4(-25, -2, 0);
const rightArmBase4 = createArmsBase4(25, -2, 0);
leftArmBase3.add(leftArmBase4);
rightArmBase3.add(rightArmBase4);

function createArmsBase5(offsetX, offsetY, offsetZ) {
  // ARTICULATED OBJECTS - FOREARMS
  const armsBaseGeo5 = new THREE.CylinderGeometry(8, 10, 50, 8);
  const armsBaseMat5 = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    map: textureSkinRoulette,
  });
  const armsBase5 = new THREE.Mesh(armsBaseGeo5, armsBaseMat5);
  armsBase5.position.x = offsetX;
  armsBase5.position.y = offsetY;
  armsBase5.position.z = offsetZ;
  return armsBase5;
}
const leftArmBase5 = createArmsBase5(10, -20, -1);
leftArmBase5.rotation.z = Math.PI / 7;
const rightArmBase5 = createArmsBase5(-10, -20, -1);
rightArmBase5.rotation.z = -Math.PI / 7;
leftArmBase4.add(leftArmBase5);
rightArmBase4.add(rightArmBase5);

// ARTICULATED OBJECTS - HANDS
function createHandBase() {
  // Hand base as a torus
  const inner = 8;
  const outer = 12;
  const radius = (inner + outer) / 2;
  const tube = (outer - inner) / 2;
  const radialSeg = 16;
  const tubularSeg = 32;

  const handBaseGeo = new THREE.TorusGeometry(
    radius,
    tube,
    radialSeg,
    tubularSeg
  );
  const handBaseMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    color: "#FFFFFF",
  });
  const handBase = new THREE.Mesh(handBaseGeo, handBaseMat);
  handBase.rotation.x = Math.PI / 2;
  return handBase;
}
const leftHandBase = createHandBase();
leftHandBase.position.set(0, -22, 0);
leftArmBase5.add(leftHandBase);
const rightHandBase = createHandBase();
rightHandBase.position.set(0, -22, 0);
rightArmBase5.add(rightHandBase);

const handsPivot = new THREE.Object3D();
handsPivot.position.set(0, -30, -12);
armsBasePivot2.add(handsPivot);

function createHand() {
  const handGeo = new THREE.CylinderGeometry(10.5, 12, 40, 12);
  const handMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    map: textureSkinRoulette,
  });
  const hand = new THREE.Mesh(handGeo, handMat);
  hand.rotation.x = Math.PI / 2;
  hand.position.set(0, 0, 21);
  return hand;
}
const leftHand = createHand();
leftHandBase.add(leftHand);
const rightHand = createHand();
rightHandBase.add(rightHand);

// ARTICULATED OBJECTS - FINGERS
function createFingers(offsetX, offsetY, offsetZ) {
  const fingerGeo = new THREE.CylinderGeometry(3, 4, 20, 8);
  const fingerMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    color: "#FFFFFF",
  });
  const finger = new THREE.Mesh(fingerGeo, fingerMat);
  finger.rotation.x = Math.PI / 2;
  finger.position.set(offsetX, offsetY, offsetZ);
  return finger;
}

const leftFinger2 = createFingers(0, 26, 0);
leftFinger2.rotation.x = Math.PI / 12;
leftHand.add(leftFinger2);

const rightFinger2 = createFingers(0, 26, 0);
rightFinger2.rotation.x = Math.PI / 12;
rightHand.add(rightFinger2);

// ARTICULATED OBJECTS - LEGS
const legsBasePivot = new THREE.Object3D();
legsBasePivot.position.set(0, -80, -12);
circle2.add(legsBasePivot);

function createLegsBase(offsetX, offsetY) {
  // ARTICULATED OBJECTS - LEGS BASE
  const legsBaseGeo = new THREE.CylinderGeometry(14, 8, 10, 8, true);
  const legsBaseMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    color: "#FFFFFF",
    flatShading: true,
  });
  const legsBase = new THREE.Mesh(legsBaseGeo, legsBaseMat);
  legsBase.position.x = offsetX;
  legsBase.position.y = offsetY;
  return legsBase;
}
const leftLegBase = createLegsBase(-40, -67);
const rightLegBase = createLegsBase(40, -67);
leftLegBase.rotation.z = -0.1;
leftLegBase.rotation.x = -0.08;
rightLegBase.rotation.z = 0.1;
rightLegBase.rotation.x = -0.08;
legsBasePivot.add(leftLegBase, rightLegBase);

function createLegsBase2(offsetX, offsetY, offsetZ) {
  // ARTICULATED OBJECTS - HIPS
  const legsBaseGeo2 = new THREE.SphereGeometry(10, 8, 6);
  const legsBaseMat2 = new THREE.MeshLambertMaterial({
    wireframe: false,
    flatShading: true,
    map: textureSkinRoulette,
  });
  const legsBase2 = new THREE.Mesh(legsBaseGeo2, legsBaseMat2);
  legsBase2.position.x = offsetX;
  legsBase2.position.y = offsetY;
  legsBase2.position.z = offsetZ;
  return legsBase2;
}
const leftLegBase2 = createLegsBase2(0, 0, 0);
leftLegBase.add(leftLegBase2);
const rightLegBase2 = createLegsBase2(0, 0, 0);
rightLegBase.add(rightLegBase2);

const legMat = new THREE.MeshLambertMaterial({
  wireframe: false,
  flatShading: true,
  map: textureSkinRoulette,
});

const upperBoxGeo = new THREE.BoxGeometry(12, 80, 12);
const lowerBoxGeo = new THREE.BoxGeometry(12, 40, 12);
const kneeGeo = new THREE.SphereGeometry(10, 8, 6);

// REST OF THE LEFT LEG
const leftUpperBox = new THREE.Mesh(upperBoxGeo, legMat);
leftUpperBox.position.set(0, -25, 0);
leftUpperBox.rotation.set(0, 0, 0);
leftLegBase2.add(leftUpperBox);

const leftKnee = new THREE.Mesh(kneeGeo, legMat);
leftKnee.position.set(0, -45, 0);
leftUpperBox.add(leftKnee);

const leftKneePivot = new THREE.Object3D();
leftKneePivot.position.set(0, 14, 0);
leftKnee.add(leftKneePivot);

const leftLowerBox = new THREE.Mesh(lowerBoxGeo, legMat);
leftLowerBox.position.set(0, -40, 0);
leftLowerBox.rotation.set(0, 0, 0);
leftKneePivot.add(leftLowerBox);

// REST OF THE RIGHT LEG
const rightUpperBox = new THREE.Mesh(upperBoxGeo, legMat);
rightUpperBox.position.set(0, -25, 0);
rightUpperBox.rotation.set(0, 0, 0);
rightLegBase2.add(rightUpperBox);

const rightKnee = new THREE.Mesh(kneeGeo, legMat);
rightKnee.position.set(0, -45, 0);
rightUpperBox.add(rightKnee);

const rightKneePivot = new THREE.Object3D();
rightKneePivot.position.set(0, 14, 0);
rightKnee.add(rightKneePivot);

const rightLowerBox = new THREE.Mesh(lowerBoxGeo, legMat);
rightLowerBox.position.set(0, -40, 0);
rightLowerBox.rotation.set(0, 0, 0);
rightKneePivot.add(rightLowerBox);

// ARTICULATED OBJECTS - SHOES
function createFoot() {
  const footGeometry = new THREE.CapsuleGeometry(15, 20, 4, 8, 1);
  const footMaterial = new THREE.MeshLambertMaterial({
    color: "#48494B",
    wireframe: false,
    flatShading: true,
  });
  const foot = new THREE.Mesh(footGeometry, footMaterial);
  foot.rotation.x = Math.PI / 2;
  return foot;
}

const leftFoot = createFoot();
leftLowerBox.add(leftFoot);
leftFoot.position.set(0, -20, 10);

const rightFoot = createFoot();
rightLowerBox.add(rightFoot);
rightFoot.position.set(0, -20, 10);

// INITIAL CAMERA POSITION AND CONTROLS
camera.position.set(0, 500, 700);
controls.target.copy(cylinder1Pivot.position);
controls.update();
camera.lookAt(cylinder1Pivot.position);

/* // GROUND PLANE
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshPhongMaterial({ color: "#4E6BA6", depthWrite: false })
);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

// GRID
const grid = new THREE.GridHelper(1000, 1000, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid); */

// USEFULL trick to inspect THREE.JS objects
window.camera = camera;

// CHARACTER TRANSLATION VARIABLES
const startPosition = new THREE.Vector3(0, 500, 0); // Starting position of the character
const targetPosition = new THREE.Vector3(600, 500, 0); // Target position to move to
let maxMoveDistance = 350; // Maximum distance the character can move
let movedDistance = 0; // Distance moved so far
let movementLocked = false; // Flag to lock movement

let isMovingToTarget = false; // Flag to indicate if the character is moving to the target
const walkSpeed = 120; // units per second
const runSpeed = 260; // units per second

// ANIMATION STATE
let currentState = "Standing";
let emote = null;
let emoteTimer = 0;
const emoteDuration = 1;

const expr = { suspicious: 0, surprised: 0, sad: 0 };

let phase = 0;

// GUI CONTROLS
const gui = new GUI({
  width: 350,
  title: "Character Controls",
});

gui.domElement.style.fontFamily = "Arial, sans-serif";
gui.domElement.style.backgroundColor = "rgba(30, 30, 40, 0.8)";
gui.domElement.style.color = "#ffffff";
gui.domElement.style.padding = "10px";

const states = { state: "Standing" };
gui;

// Emotes
const emoteControls = {
  jump() {
    if (!emote) {
      emote = "jump"; // Set emote to jump
      emoteTimer = 0; // Reset emote timer
    }
  },
  wave() {
    if (!emote) {
      emote = "wave"; // Set emote to wave
      emoteTimer = 0; // Reset emote timer
    }
  },
};
const emoteFolder = gui.addFolder("Emotes"); // Emote Controls
emoteFolder.add(emoteControls, "jump").name("Jump"); // Jump Emote
emoteFolder.add(emoteControls, "wave").name("Wave"); // Wave Emote
emoteFolder.open();

const exprFolder = gui.addFolder("Expressions"); // Expression Controls
exprFolder.add(expr, "suspicious", 0, 1, 0.01).name("Suspicious"); // Suspicious Expression
exprFolder.add(expr, "surprised", 0, 1, 0.01).name("Surprised"); // Surprised Expression
exprFolder.add(expr, "sad", 0, 1, 0.01).name("Sad"); // Sad Expression
exprFolder.open();

const infoDiv = document.createElement("div"); // Information Div
infoDiv.style.position = "fixed";
infoDiv.style.left = "10px";
infoDiv.style.bottom = "10px";
infoDiv.style.padding = "10px 15px";
infoDiv.style.backgroundColor = "rgba(0,0,0,0.6)";
infoDiv.style.color = "#fff";
infoDiv.style.fontFamily = "Arial, sans-serif";
infoDiv.style.fontSize = "14px";
infoDiv.style.borderRadius = "8px";
infoDiv.style.lineHeight = "1.5em";
infoDiv.style.maxWidth = "250px";
infoDiv.innerHTML = `
  <b>Keyboard Controls:</b><br>
  1 - Standing<br>
  2 - Walking<br>
  3 - Running<br>
  W - Wave<br>
  P - POV (PRESS AGAIN TO LEAVE)<br>
  Space - Jump <br> <br>
  <b>Mouse Controls:</b><br>
  <strong>Drag and drop the right arm (your POV) against the stoppers.</strong><br>
  <br><br>
  <b>Backspace - Resets ONLY the character's position</b>
`;
document.body.appendChild(infoDiv);

// LIGHTS
const ambient = new THREE.AmbientLight(0xffffff, 0.2); // Ambient light for general illumination
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.2); // Directional light to simulate sunlight
dir.position.set(100, 1000, 100); // Set light position
dir.castShadow = true; // Enable shadows for the light
dir.shadow.camera.near = 0.1; // Set shadow camera near plane
dir.shadow.camera.far = 500; // Set shadow camera far plane
scene.add(dir); // Add directional light to the scene

// SHADOWS
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// RENDER LOOP
renderer.setAnimationLoop(render);

// STATES FUNCTION
function animateLocomotion(dt) {
  const isWalking = currentState === "Walking"; // Check if the character is walking
  const isRunning = currentState === "Running"; // Check if the character is running

  if (!isWalking && !isRunning) return;

  const speed = isWalking ? 3 : 6; // Speed based on state
  const armAmp = isWalking ? 0.5 : 0.9; // Arm amplitude based on state
  const legAmp = isWalking ? 0.6 : 0.9; // Leg amplitude based on state

  phase += dt * speed; // Update phase based on speed

  const s = Math.sin(phase); // Sine of the phase
  const s2 = Math.sin(phase + Math.PI); // Sine of the phase offset by PI

  leftLegBase.rotation.x = s * legAmp; // Left leg rotation
  rightLegBase.rotation.x = s2 * legAmp; // Right leg rotation

  leftKneePivot.rotation.x = Math.max(0, -s) * 0.8; // Left knee rotation
  rightKneePivot.rotation.x = Math.max(0, -s2) * 0.8; // Right knee rotation

  leftLowerBox.rotation.x = Math.max(0, -s) * 0.6; // Left lower leg rotation
  rightLowerBox.rotation.x = Math.max(0, -s2) * 0.6; // Right lower leg rotation

  leftArmBase2.rotation.x = s2 * armAmp; // Left arm rotation
  rightArmBase2.rotation.x = s * armAmp; // Right arm rotation

  if (isWalking) {
    // WALKING
    leftArmBase4.rotation.x = Math.max(0, -s2) * 0.25; // Left forearm rotation
    rightArmBase4.rotation.x = Math.max(0, -s) * 0.25; // Right forearm rotation
  }

  if (isRunning) {
    // RUNNING
    leftArmBase4.rotation.x = THREE.MathUtils.clamp(-s2, 0, 1) * 0.8; // Left forearm rotation

    rightArmBase4.rotation.x = THREE.MathUtils.clamp(-s, 0, 1) * 0.8; // Right forearm rotation
  }
}

// MOVE CHARACTER FUNCTION
function moveCharacter(dt) {
  if (currentState !== "Walking" && currentState !== "Running") return; // Only move if walking or running
  if (!isMovingToTarget) return; // Only move if flagged to move

  const speed = currentState === "Walking" ? walkSpeed : runSpeed; // Speed based on state

  const direction = new THREE.Vector3().subVectors(
    targetPosition,
    cylinder1Pivot.position
  );

  const distanceToTarget = direction.length();

  if (movedDistance >= maxMoveDistance || distanceToTarget < 0.5) {
    isMovingToTarget = false;
    currentState = "Standing";
    movedDistance = 0;
    return;
  }

  direction.normalize().multiplyScalar(-1); // Normalize and invert direction

  const step = speed * dt; // Calculate step size
  cylinder1Pivot.position.addScaledVector(direction, step); // Move character
  movedDistance += step; // Update moved distance

  // Rotate character to face movement direction
  const angle = Math.atan2(direction.x, direction.z);
  cylinder1Pivot.rotation.y = angle;
}

// WAVE FUNCTION
function animateWave(dt) {
  const riseTime = 0.6; // Time taken to raise the arm
  const holdTime = 2.0; // Time to hold the wave position
  const fallTime = 0.6; // Time taken to lower the arm

  const totalTime = riseTime + holdTime + fallTime; // Total time for the wave emote
  emoteTimer += dt; // Update emote timer

  let raise = 0; // Variable to track arm raise amount

  if (emoteTimer < riseTime) {
    // Raising phase
    const t = emoteTimer / riseTime; // Normalized time for rising
    raise = t * t * (3 - 2 * t); // Smoothstep function for easing
  } else if (emoteTimer < riseTime + holdTime) {
    // Holding phase
    raise = 1; // Arm is fully raised
  } else if (emoteTimer < totalTime) {
    // Falling phase
    const t = (emoteTimer - riseTime - holdTime) / fallTime; // Normalized time for falling
    raise = 1 - t * t * (3 - 2 * t); // Smoothstep function for easing
  } else {
    emote = null; // End of emote
    emoteTimer = 0; // Reset emote timer

    rightArmBase2.rotation.set(0, 0, 0); // Reset arm rotations
    rightArmBase4.rotation.set(0, 0, 0); // Reset forearm rotations
    return;
  }

  rightArmBase2.rotation.x = (-Math.PI / 1.7) * raise; // Raise the upper arm

  rightArmBase4.rotation.x = (-Math.PI / 18) * raise; // Slight bend in the forearm

  const wave = Math.sin(emoteTimer * 7) * 0.5 * raise; // Waving motion
  rightArmBase4.rotation.z = wave; // Apply waving motion to forearm
}

// JUMP FUNCTION
function animateJump(dt) {
  const jumpHeight = 80; // Height of the jump
  const jumpTime = 1.0; // Total time for the jump emote
  emoteTimer += dt; // Update emote timer

  const t = Math.min(emoteTimer / jumpTime, 1); // Normalized time for the jump

  const y = jumpHeight * 4 * t * (1 - t); // Parabolic jump calculation

  cylinder1Pivot.position.y = 500 + y; // Update character's vertical position

  const legBend = y / jumpHeight; // Calculate leg bend based on jump height
  leftLegBase2.rotation.x = -legBend * 0.8; // Bend left leg
  rightLegBase2.rotation.x = -legBend * 0.8; // Bend right leg

  if (t >= 1) {
    // End of jump
    emote = null; // Reset emote
    emoteTimer = 0; // Reset emote timer
    cylinder1Pivot.position.y = 500; // Reset vertical position
    leftLegBase2.rotation.x = 0; // Reset left leg rotation
    rightLegBase2.rotation.x = 0; // Reset right leg rotation
  }
}

// BREATHING
let breathPhase = 0; // Phase for breathing animation
const breathSpeed = 1.25; // Speed of breathing
const breathAmp = 0.02; // Amplitude of breathing

// BREATHING FUNCTION
function animateBreathing(dt) {
  // Breathing animation
  if (currentState !== "Standing") return; // Only breathe when standing

  breathPhase += dt * breathSpeed; // Update breath phase

  const breath = Math.sin(breathPhase) * breathAmp; // Calculate breath offset

  leftArmBase2.rotation.x = breath; // Breathe arms

  // Breathe forearms
  leftArmBase4.rotation.x = breath * 0.9;
  rightArmBase4.rotation.x = -breath * 0.9;

  // Breathe legs
  leftLegBase.rotation.x = -breath * 0.9;
  rightLegBase.rotation.x = breath * 0.9;

  // Breathe lower legs
  leftLowerBox.rotation.x = -breath * 0.9;
  rightLowerBox.rotation.x = breath * 0.9;

  // Cape moves while breathing
  cape2.rotation.x = Math.PI / 18 + breath * 0.9;

  // Body moves while breathing
  cylinder1Pivot.position.y = 500 + breath * 10;
}

// UPDATE ANIMATION FUNCTION
function updateAnimation(dt) {
  // Update character animation
  animateLocomotion(dt); // Locomotion animation

  if (emote === "wave") animateWave(dt); // Wave emote
  if (emote === "jump") animateJump(dt); // Jump emote
  animateBreathing(dt); // Breathing animation
  moveCharacter(dt); // Character movement
}

// EXPRESSIONS FUNCTION
function animateExpressions() {
  // Animate facial expressions
  if (
    typeof eyeMesh !== "undefined" && // Ensure eyeMesh is defined
    typeof eyebrowMesh !== "undefined" && // Ensure eyebrowMesh is defined
    typeof eyebrowPivot !== "undefined" // Ensure eyebrowPivot is defined
  ) {
    const eyeScaleY =
      1 + expr.surprised * 0.3 - expr.suspicious * 0.45 - expr.sad * 0.2; // Calculate eye scale based on expressions
    eyeMesh.scale.set(1, Math.max(0.2, eyeScaleY), 1); // Apply eye scale with minimum limit

    const baseEyebrowY = 18; // Base Y position for the eyebrow
    const eyebrowY =
      baseEyebrowY + expr.surprised * 8 - expr.suspicious * 4 - expr.sad * 3; // Calculate eyebrow Y position based on expressions
    eyebrowMesh.position.y = eyebrowY; // Apply eyebrow Y position

    const eyebrowTilt = expr.suspicious * 0.45 - expr.sad * 0.25; // Calculate eyebrow tilt based on expressions
    eyebrowPivot.rotation.set(0, 0, eyebrowTilt); // Apply eyebrow tilt
  }
}

// MOUSE INTERACTION FOR DRAGGING THE RIGHT ARM
const raycaster = new THREE.Raycaster(); // Raycaster for mouse interaction
const mouse = new THREE.Vector2(); // Normalized mouse coordinates
let draggingArm = false; // Flag to track if the arm is being dragged
let dragPlane = new THREE.Plane(); // Plane for dragging calculations
let intersectPoint = new THREE.Vector3(); // Point of intersection with the drag plane

function onMouseDown(event) {
  // Mouse down event handler
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize mouse X coordinate
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize mouse Y coordinate

  raycaster.setFromCamera(mouse, camera); // Set raycaster from camera and mouse position

  const intersects = raycaster.intersectObject(rightArmBase3, true); // Check for intersection with right arm
  if (intersects.length > 0) {
    // If intersection occurs
    draggingArm = true; // Set dragging flag to true

    controls.enabled = false;

    const elbowWorldPos = rightArmBase2.getWorldPosition(new THREE.Vector3()); // Get elbow world position
    dragPlane.setFromNormalAndCoplanarPoint(
      // Set drag plane
      camera.getWorldDirection(new THREE.Vector3()).clone().negate(), // Plane normal facing camera
      elbowWorldPos // Coplanar point at elbow position
    );
  }
}

let targetElbowAngle = 0; // Target angle for the elbow
const elbowLerpSpeed = 5; // Speed for elbow angle interpolation

function onMouseMove(event) {
  if (!draggingArm) return; // If not dragging, exit

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize mouse X coordinate
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize mouse Y coordinate

  raycaster.setFromCamera(mouse, camera); // Set raycaster from camera and mouse position

  raycaster.ray.intersectPlane(dragPlane, intersectPoint); // Find intersection with drag plane
  if (!intersectPoint) return; // If no intersection, exit

  const elbowWorldPos = rightArmBase2.getWorldPosition(new THREE.Vector3()); // Get elbow world position

  const localPoint = rightArmBase2.parent.worldToLocal(intersectPoint.clone()); // Convert intersection point to local space

  const dir = localPoint.clone().sub(rightArmBase2.position); // Direction vector from elbow to intersection point

  targetElbowAngle = Math.atan2(dir.y, dir.x); // Calculate target elbow angle
}

function onMouseUp(event) {
  draggingArm = false; // Reset dragging flag on mouse up
  controls.enabled = true; // Re-enable controls
}

window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mouseup", onMouseUp, false);

function updateElbow(dt) {
  // Update elbow rotation towards target angle
  rightArmBase2.rotation.z +=
    (targetElbowAngle - rightArmBase2.rotation.z) *
    Math.min(dt * elbowLerpSpeed, 1); // Interpolate elbow rotation
}

// WHEEL SPINNING VARIABLES AND FUNCTION
let wheelSpeed = 0.0;
const wheelFriction = 0.995;
let stopping = false;
let pointerAngle = 0;
let pointerVelocity = 0;
const pointerDamping = 5;
const pointerStiffness = 200;
const POINTER_REST_X = Math.PI;
const POINTER_REST_Z = 0;

function spinTheWheel(dt) {
  // Spin the wheel and handle pointer interaction
  const pointerBox = new THREE.Box3().setFromObject(pointer); // Bounding box for pointer
  const fingerBox = new THREE.Box3().setFromObject(rightFinger2); // Bounding box for finger

  let pointerHit = false;
  let fingerHit = false;

  pointerStopperPivot.children.forEach((stopper) => {
    // Check for collisions with stoppers
    const stopperBox = new THREE.Box3().setFromObject(stopper); // Bounding box for stopper
    if (pointerBox.intersectsBox(stopperBox)) {
      pointerHit = true; // Pointer hit detected
    }
    if (fingerBox.intersectsBox(stopperBox)) {
      fingerHit = true; // Finger hit detected
    }
  });

  if (fingerHit && wheelSpeed === 0) {
    // Start spinning the wheel if finger hits stopper
    stopping = true; // Begin stopping process
    wheelSpeed = Math.random() * 10 + 20; // Random initial wheel speed
  }

  if (stopping) {
    wheelSpeed *= wheelFriction; // Apply friction to slow down the wheel
    if (wheelSpeed < 0.01) {
      // Stop the wheel if speed is low enough
      wheelSpeed = 0; // Set wheel speed to zero
      stopping = false; // Reset stopping flag
    }
  }

  circle1.rotation.z -= wheelSpeed * dt; // Rotate the wheel

  if (pointerHit) pointerVelocity = -3; // Apply force to pointer if it hits a stopper

  const force = (0 - pointerAngle) * pointerStiffness; // Calculate restoring force for pointer
  pointerVelocity += force * dt; // Update pointer velocity with restoring force
  pointerVelocity *= Math.exp(-pointerDamping * dt); // Apply damping (amortecimento) to pointer velocity
  pointerAngle += pointerVelocity * dt; // Update pointer angle based on velocity

  pointer.rotation.x = POINTER_REST_X; // Set pointer X rotation
  pointer.rotation.z = POINTER_REST_Z + pointerAngle; // Update pointer Z rotation with angle

  pointerAngle = THREE.MathUtils.clamp(pointerAngle, -0.5, 0); // Clamp pointer angle within limits

  // Turn off orbit controls when spinning
  if (wheelSpeed > 0) {
    controls.enabled = false; // Disable controls while wheel is spinning
  } else {
    controls.enabled = true; // Enable controls when wheel is stopped
  }
}

// RENDER FUNCTION
function render(time) {
  if (!render._last) render._last = time; // Initialize last time
  const dt = (time - render._last) / 1000; // Calculate delta time
  render._last = time; // Update last time

  updateAnimation(dt); // Update character animation
  spinTheWheel(dt); // Update wheel spinning
  animateExpressions(); // Update facial expressions
  updateElbow(dt); // Update elbow rotation

  if (povMode) {
    const headWorldPos = cylinder1Pivot.position.clone().add(povOffset);
    camera.position.lerp(headWorldPos, 0.2); // Smoothly follow the head position

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(cylinder1Pivot.quaternion); // Rotate forward vector by character's orientation
    const lookAtPos = headWorldPos.clone().add(forward);

    controls.enabled = false; // Disable controls in POV mode

    camera.lookAt(lookAtPos);
  }

  renderer.render(scene, camera); // Render the scene
}

// KEYBOARD CONTROLS
window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if (!emote) {
      emote = "jump";
      emoteTimer = 0;
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "w") {
    if (!emote) {
      emote = "wave";
      emoteTimer = 0;
    }
  }
});

// POV MODE TOGGLE
let povMode = false;
let povOffset = new THREE.Vector3(0, 120, 0);
let normalCameraPosition = camera.position.clone();
let normalCameraTarget = controls.target.clone();

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "p") {
    povMode = !povMode;

    if (povMode) {
      const headWorldPos = cylinder1Pivot.position.clone().add(povOffset);
      camera.position.copy(headWorldPos);

      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(cylinder1Pivot.quaternion); // Rotate forward vector by character's orientation
      const lookAtPos = headWorldPos.clone().add(forward); // Point in front of the character

      camera.lookAt(lookAtPos);
      controls.enabled = false;
    } else {
      camera.position.copy(normalCameraPosition);
      controls.target.copy(normalCameraTarget);
      controls.enabled = true;
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "1") {
    currentState = "Standing";
    isMovingToTarget = false;
    return;
  }

  // Lock movement after first walking or running command
  if (movementLocked) return;

  if (event.key === "2") {
    currentState = "Walking";
    isMovingToTarget = true;
    movementLocked = true; // Blocked if walked once
  }

  if (event.key === "3") {
    currentState = "Running";
    isMovingToTarget = true;
    movementLocked = true; // Blocked if ran once
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    // Reset character position
    cylinder1Pivot.position.copy(startPosition);

    // Reset rotation
    cylinder1Pivot.position.set(0, 506, 0);
    cylinder1Pivot.rotation.z = Math.PI / 2;
    cylinder1Pivot.rotation.x = Math.PI / 2;
    cylinder1Pivot.rotation.y = -Math.PI / 2;

    // Reset movement flags
    currentState = "Standing";
    isMovingToTarget = false;
    movementLocked = false;
    movedDistance = 0;

    // Reset wheel
    wheelSpeed = 0;
    stopping = false;
    pointerAngle = 0;
    pointerVelocity = 0;
    pointer.rotation.z = POINTER_REST_Z;

    // Reset emotes
    emote = null;
    emoteTimer = 0;

    // Re-enable controls
    controls.enabled = true;
  }
});

// RESPONSIVE DESIGN
window.addEventListener("resize", (event) => {
  // update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  // updates the camera projection matrix,
  // which is the matrix that converts from 3D world coordinates
  // to 2D screen coordinates
  camera.updateProjectionMatrix();
  // update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
});
