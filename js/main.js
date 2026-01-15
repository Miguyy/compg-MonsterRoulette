import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// GLTF LOADER CASINO
const loader = new GLTFLoader();

loader.load("../assets/gameready_casino_scene.glb", function (gltf) {
  const model = gltf.scene;

  model.position.set(1570, 1050, 0);
  model.scale.set(3, 3, 3);
  model.rotation.set(0, 0, 0);

  scene.add(model);
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 181, 300);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
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
  wireframe: false,
  map: textureSkinRoulette,
  specular: 0x333333,
  shininess: 1000,
});
let cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
// SHADOWS
cylinder1.castShadow = true;
cylinder1.receiveShadow = true;
cylinder1Pivot.add(cylinder1);
cylinder1.rotation.x = Math.PI / 2;

// ROULETTE BACK - CAPE
const shape = new THREE.Shape();
shape.moveTo(-120, 0);
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
cape2.position.set(0, 0, -10);
cape2.rotation.x = Math.PI / 18;

cylinder1Pivot.add(cape2);

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

for (let i = 0; i < stopperCount; i++) {
  const angle = (i / stopperCount) * Math.PI * 2;
  const stopper = new THREE.Mesh(
    pointerStopperGeometry,
    pointerStopperMaterial
  );
  stopper.position.set(
    Math.cos(angle) * stopperRadius,
    Math.sin(angle) * stopperRadius,
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
let pointerArmGeometry = new THREE.BoxGeometry(18, 20, 3);
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
  const eyeGeom = new THREE.SphereGeometry(22, 16, 8).toNonIndexed();
  eyeGeom.computeVertexNormals();

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

// ARTICULATED OBJECTS - ARMS BASE
const armsBasePivot = new THREE.Object3D();
armsBasePivot.position.set(0, -30, -12);
circle2.add(armsBasePivot);

function createArmsBase(offsetX, offsetY) {
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
function createFinger1(offsetX, offsetY, offsetZ) {
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

const leftFinger2 = createFinger1(0, 26, 0);
leftFinger2.rotation.x = Math.PI / 12;
leftHand.add(leftFinger2);

const rightFinger2 = createFinger1(0, 26, 0);
rightFinger2.rotation.x = Math.PI / 12;
rightHand.add(rightFinger2);

// ARTICULATED OBJECTS - LEGS BASE
const legsBasePivot = new THREE.Object3D();
legsBasePivot.position.set(0, -80, -12);
circle2.add(legsBasePivot);

function createLegsBase(offsetX, offsetY) {
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

// LEFT LEG
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

// RIGHT LEG
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

// CAMERA AND CONTROLS UPDATE
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
gui
  .add(states, "state", ["Standing", "Walking", "Running"])
  .name("Character State")
  .onChange((v) => {
    currentState = v;
  });

// Emotes
const emoteControls = {
  jump() {
    if (!emote) {
      emote = "jump";
      emoteTimer = 0;
    }
  },
  wave() {
    if (!emote) {
      emote = "wave";
      emoteTimer = 0;
    }
  },
};
const emoteFolder = gui.addFolder("Emotes");
emoteFolder.add(emoteControls, "jump").name("Jump");
emoteFolder.add(emoteControls, "wave").name("Wave");
emoteFolder.open();

const exprFolder = gui.addFolder("Expressions");
exprFolder.add(expr, "suspicious", 0, 1, 0.01).name("Suspicious");
exprFolder.add(expr, "surprised", 0, 1, 0.01).name("Surprised");
exprFolder.add(expr, "sad", 0, 1, 0.01).name("Sad");
exprFolder.open();

const infoDiv = document.createElement("div");
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
`;
document.body.appendChild(infoDiv);

// LIGHTS
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.2);
dir.position.set(100, 1000, 100);
dir.castShadow = true;
dir.shadow.camera.near = 0.1;
dir.shadow.camera.far = 500;
scene.add(dir);

// SHADOWS
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// RENDER LOOP
renderer.setAnimationLoop(render);

function animateLocomotion(dt) {
  const isWalking = currentState === "Walking";
  const isRunning = currentState === "Running";

  if (!isWalking && !isRunning) return;

  const speed = isWalking ? 3 : 6;
  const armAmp = isWalking ? 0.5 : 0.9;
  const legAmp = isWalking ? 0.6 : 1.1;

  phase += dt * speed;

  const s = Math.sin(phase);
  const s2 = Math.sin(phase + Math.PI);

  leftLegBase.rotation.x = s * legAmp;
  rightLegBase.rotation.x = s2 * legAmp;

  leftKneePivot.rotation.x = Math.max(0, -s) * 0.8;
  rightKneePivot.rotation.x = Math.max(0, -s2) * 0.8;

  leftLowerBox.rotation.x = Math.max(0, -s) * 0.6;
  rightLowerBox.rotation.x = Math.max(0, -s2) * 0.6;

  leftArmBase2.rotation.x = s2 * armAmp;
  rightArmBase2.rotation.x = s * armAmp;

  if (isWalking) {
    leftArmBase4.rotation.x = Math.max(0, -s2) * 0.25;
    rightArmBase4.rotation.x = Math.max(0, -s) * 0.25;
  }

  if (isRunning) {
    leftArmBase4.rotation.x = THREE.MathUtils.clamp(-s2, 0, 1) * 0.8;

    rightArmBase4.rotation.x = THREE.MathUtils.clamp(-s, 0, 1) * 0.8;
  }
}

function animateWave(dt) {
  const riseTime = 0.6;
  const holdTime = 2.0;
  const fallTime = 0.6;

  const totalTime = riseTime + holdTime + fallTime;
  emoteTimer += dt;

  let raise = 0;

  if (emoteTimer < riseTime) {
    const t = emoteTimer / riseTime;
    raise = t * t * (3 - 2 * t);
  } else if (emoteTimer < riseTime + holdTime) {
    raise = 1;
  } else if (emoteTimer < totalTime) {
    const t = (emoteTimer - riseTime - holdTime) / fallTime;
    raise = 1 - t * t * (3 - 2 * t);
  } else {
    emote = null;
    emoteTimer = 0;

    rightArmBase2.rotation.set(0, 0, 0);
    rightArmBase4.rotation.set(0, 0, 0);
    return;
  }

  rightArmBase2.rotation.x = (-Math.PI / 1.7) * raise;

  rightArmBase4.rotation.x = (-Math.PI / 18) * raise;

  const wave = Math.sin(emoteTimer * 7) * 0.5 * raise;
  rightArmBase4.rotation.z = wave;
}

function animateJump(dt) {
  const jumpHeight = 80;
  const jumpTime = 1.0;
  emoteTimer += dt;

  const t = Math.min(emoteTimer / jumpTime, 1);

  const y = jumpHeight * 4 * t * (1 - t);

  cylinder1Pivot.position.y = 500 + y;

  const legBend = y / jumpHeight;
  leftLegBase2.rotation.x = -legBend * 0.8;
  rightLegBase2.rotation.x = -legBend * 0.8;

  if (t >= 1) {
    emote = null;
    emoteTimer = 0;
    cylinder1Pivot.position.y = 500;
    leftLegBase2.rotation.x = 0;
    rightLegBase2.rotation.x = 0;
  }
}

// BREATHING
let breathPhase = 0;
const breathSpeed = 1;
const breathAmp = 0.02;

function animateBreathing(dt) {
  if (currentState !== "Standing") return;

  breathPhase += dt * breathSpeed;

  const breath = Math.sin(breathPhase) * breathAmp;

  leftArmBase2.rotation.x = breath;

  leftArmBase4.rotation.x = breath * 0.9;
  rightArmBase4.rotation.x = -breath * 0.9;

  leftLegBase.rotation.x = -breath * 0.9;
  rightLegBase.rotation.x = breath * 0.9;

  leftLowerBox.rotation.x = -breath * 0.9;
  rightLowerBox.rotation.x = breath * 0.9;

  cape2.rotation.x = Math.PI / 18 + breath * 0.9;

  cylinder1Pivot.position.y = 500 + breath * 10;
}

function updateAnimation(dt) {
  animateLocomotion(dt);

  if (emote === "wave") animateWave(dt);
  if (emote === "jump") animateJump(dt);
  animateBreathing(dt);
}

function animateExpressions() {
  if (
    typeof eyeMesh !== "undefined" &&
    typeof eyebrowMesh !== "undefined" &&
    typeof eyebrowPivot !== "undefined"
  ) {
    const eyeScaleY =
      1 + expr.surprised * 0.3 - expr.suspicious * 0.45 - expr.sad * 0.2;
    eyeMesh.scale.set(1, Math.max(0.2, eyeScaleY), 1);

    const baseEyebrowY = 18;
    const eyebrowY =
      baseEyebrowY + expr.surprised * 8 - expr.suspicious * 4 - expr.sad * 3;
    eyebrowMesh.position.y = eyebrowY;

    const eyebrowTilt = expr.suspicious * 0.45 - expr.sad * 0.25;
    eyebrowPivot.rotation.set(0, 0, eyebrowTilt);
  }
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let draggingArm = false;
let dragPlane = new THREE.Plane();
let intersectPoint = new THREE.Vector3();

function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(rightArmBase3, true);
  if (intersects.length > 0) {
    draggingArm = true;

    const elbowWorldPos = rightArmBase2.getWorldPosition(new THREE.Vector3());
    dragPlane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()).clone().negate(),
      elbowWorldPos
    );
  }
}

let targetElbowAngle = 0;
const elbowLerpSpeed = 5;

function onMouseMove(event) {
  if (!draggingArm) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  raycaster.ray.intersectPlane(dragPlane, intersectPoint);
  if (!intersectPoint) return;

  const elbowWorldPos = rightArmBase2.getWorldPosition(new THREE.Vector3());

  const localPoint = rightArmBase2.parent.worldToLocal(intersectPoint.clone());

  const dir = localPoint.clone().sub(rightArmBase2.position);

  targetElbowAngle = Math.atan2(dir.y, dir.x);
}

function onMouseUp(event) {
  draggingArm = false;
}

window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mouseup", onMouseUp, false);

function updateElbow(dt) {
  rightArmBase2.rotation.z +=
    (targetElbowAngle - rightArmBase2.rotation.z) *
    Math.min(dt * elbowLerpSpeed, 1);
}

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
  const pointerBox = new THREE.Box3().setFromObject(pointer);
  const fingerBox = new THREE.Box3().setFromObject(rightFinger2);

  let pointerHit = false;
  let fingerHit = false;

  pointerStopperPivot.children.forEach((stopper) => {
    const stopperBox = new THREE.Box3().setFromObject(stopper);
    if (pointerBox.intersectsBox(stopperBox)) {
      pointerHit = true;
    }
    if (fingerBox.intersectsBox(stopperBox)) {
      fingerHit = true;
    }
  });

  if (fingerHit && wheelSpeed === 0) {
    stopping = true;
    wheelSpeed = Math.random() * 10 + 20;
  }

  if (stopping) {
    wheelSpeed *= wheelFriction;
    if (wheelSpeed < 0.01) {
      wheelSpeed = 0;
      stopping = false;
    }
  }

  circle1.rotation.z -= wheelSpeed * dt;

  if (pointerHit) pointerVelocity = -3;

  const force = (0 - pointerAngle) * pointerStiffness;
  pointerVelocity += force * dt;
  pointerVelocity *= Math.exp(-pointerDamping * dt);
  pointerAngle += pointerVelocity * dt;

  pointer.rotation.x = POINTER_REST_X;
  pointer.rotation.z = POINTER_REST_Z + pointerAngle;

  pointerAngle = THREE.MathUtils.clamp(pointerAngle, -0.5, 0);
}

function render(time) {
  if (!render._last) render._last = time;
  const dt = (time - render._last) / 1000;
  render._last = time;

  updateAnimation(dt);
  spinTheWheel(dt);
  animateExpressions();

  updateElbow(dt);

  renderer.render(scene, camera);
}

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
      forward.applyQuaternion(cylinder1Pivot.quaternion);
      const lookAtPos = headWorldPos.clone().add(forward);

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
  } else if (event.key === "2") {
    currentState = "Walking";
  } else if (event.key === "3") {
    currentState = "Running";
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
