import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 181, 300);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#4E6BA6");
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// TEXTURES
let textureCylinder = new THREE.TextureLoader().load("../images/cylinder1.jpg");
let textureSlots = new THREE.TextureLoader().load("../images/slots.png");
textureSlots.wrapS = THREE.RepeatWrapping;
textureSlots.wrapT = THREE.RepeatWrapping;
textureSlots.center.set(0.5, 0.58);
textureSlots.repeat.set(0.5, 0.5);

// CYLINDER PIVOT - BASE OF THE ROULETTE
const cylinder1Pivot = new THREE.Object3D();
cylinder1Pivot.position.set(0, 181, 0);
scene.add(cylinder1Pivot);

// CYLINDER - BASE OF THE ROULETTE
let cylinder1Geometry = new THREE.CylinderGeometry(80, 80, 14, 60);
let cylinder1Material = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureCylinder,
});
let cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
// SHADOWS
cylinder1.castShadow = true;
cylinder1.receiveShadow = true;
cylinder1Pivot.add(cylinder1);
cylinder1.rotation.x = Math.PI / 2;

// CAMERA AND CONTROLS UPDATE
camera.position.set(0, 150, 420);
controls.target.copy(cylinder1Pivot.position);
controls.update();
camera.lookAt(cylinder1Pivot.position);

// CIRCLE 1 PIVOT - FRONT OF THE ROULETTE
const circle1Pivot = new THREE.Object3D();
circle1Pivot.position.set(0, 0, 7.5);
cylinder1Pivot.add(circle1Pivot);

// CIRCLE 1 - FRONT OF THE ROULETTE
let circle1Geometry = new THREE.CircleGeometry(75, 60);
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
circle2Pivot.position.set(0, 0, 7.8);
cylinder1Pivot.add(circle2Pivot);

// CIRCLE 2 - INNER CIRCLE
let circle2Geometry = new THREE.CircleGeometry(18, 60);
let circle2Material = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureCylinder,
});
let circle2 = new THREE.Mesh(circle2Geometry, circle2Material);
circle2Pivot.add(circle2);

// POINTER PIVOT
const pointerPivot = new THREE.Object3D();
pointerPivot.position.set(0, 10, 8);
cylinder1Pivot.add(pointerPivot);

// POINTER OF THE ROULETTE
let pointerGeometry = new THREE.CylinderGeometry(1, 4, 12, 10);
let pointerMaterial = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureCylinder,
});
let pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
pointerPivot.add(pointer);
pointer.rotation.x = Math.PI;
pointer.position.set(0, 62, 3.65);

// POINTER ARM PIVOT
const pointerArmPivot = new THREE.Object3D();
pointerArmPivot.position.set(0, 69, 0);
pointerPivot.add(pointerArmPivot);

// POINTER ARM
let pointerArmGeometry = new THREE.BoxGeometry(8, 15, 3);
let pointerArmMaterial = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureCylinder,
});
let pointerArm = new THREE.Mesh(pointerArmGeometry, pointerArmMaterial);
pointerPivot.add(pointerArm);
pointerArm.rotation.x = Math.PI / 2;
pointerArm.position.set(0, 68.2, 0);

//POINTS STOPPER PIVOT
const pointerStopperPivot = new THREE.Object3D();
pointerStopperPivot.position.set(0, 0, 2);
circle1.add(pointerStopperPivot);
pointerStopperPivot.rotation.z = Math.PI / 16;

// POINTER STOPPER
const pointerStopperGeometry = new THREE.CylinderGeometry(2, 2, 8, 10);
const pointerStopperMaterial = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureCylinder,
});
const stopperCount = 16;
const stopperRadius = 65;

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

// ARTICULATED OBJECTS - EYE
const eyePivot = new THREE.Object3D();
eyePivot.position.set(0, 0, -2);
circle2.add(eyePivot);

function createEye() {
  const eyeGeom = new THREE.SphereGeometry(12, 16, 8).toNonIndexed();
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
eyebrowPivot.position.set(0, 18, 5);
eyePivot.add(eyebrowPivot);

function createEyebrow() {
  const eyebrowGeometry = new THREE.BoxGeometry(30, 5, 5);
  const eyebrowMaterial = new THREE.MeshLambertMaterial({
    color: "#ffffff",
    wireframe: false,
  });
  const eyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  return eyebrow;
}
const eyebrowMesh = createEyebrow();
eyebrowPivot.add(eyebrowMesh);

// ARTICULATED OBJECTS - ARMS
const armsPivot = new THREE.Object3D();
armsPivot.position.set(0, -30, -8);
circle2.add(armsPivot);

function createArms(offsetX, offsetY) {
  const armsGeometry = new THREE.CapsuleGeometry(10, 90, 4, 8, 1);
  const armsMaterial = new THREE.MeshLambertMaterial({
    wireframe: false,
    color: "#ffffff",
    flatShading: true,
  });
  const arms = new THREE.Mesh(armsGeometry, armsMaterial);
  arms.position.x = offsetX;
  arms.position.y = offsetY;
  return arms;
}
const leftArm = createArms(-90, 70);
const rightArm = createArms(102, -10);
rightArm.rotation.z = Math.PI / 12;
armsPivot.add(leftArm, rightArm);

// ARTICULATED OBJECTS - ARM CLOTHES
const armClothesPivot = new THREE.Object3D();
armClothesPivot.position.set(0, -30, 0);
armsPivot.add(armClothesPivot);

function createArmClothes(offsetX, offsetY) {
  const handsGeo = new THREE.CapsuleGeometry(14, 60, 4, 8, 1);
  const handsMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    map: textureCylinder,
    flatShading: true,
  });
  const hands = new THREE.Mesh(handsGeo, handsMat);
  hands.position.x = offsetX;
  hands.position.y = offsetY;
  return hands;
}
const leftHand = createArmClothes(-90, 86);
const rightHand = createArmClothes(94, 32);
rightHand.rotation.z = Math.PI / 12;
/* armClothesPivot.add(leftHand, rightHand); */

// ARTICULATED OBJECTS - LEGS
const legsPivot = new THREE.Object3D();
legsPivot.position.set(0, -125, -8);
circle2.add(legsPivot);

function createLegs(offsetX) {
  const legsGeometry = new THREE.CapsuleGeometry(8, 90, 4, 8, 1);
  const legsMaterial = new THREE.MeshLambertMaterial({
    wireframe: false,
    color: "#ffffff",
    flatShading: true,
  });

  const legs = new THREE.Mesh(legsGeometry, legsMaterial);
  legs.position.x = offsetX;
  return legs;
}
const leftLeg = createLegs(-30);
const rightLeg = createLegs(30);
legsPivot.add(leftLeg, rightLeg);

// ARTICULATED OBJECTS - LEG CLOTHES
const legClothesPivot = new THREE.Object3D();
legClothesPivot.position.set(0, 6, 0);
legsPivot.add(legClothesPivot);

function createLegClothes(offsetX) {
  const legsGeo = new THREE.CapsuleGeometry(16, 70, 4, 8, 1);
  const legsMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    map: textureCylinder,
    flatShading: true,
  });
  const legs = new THREE.Mesh(legsGeo, legsMat);
  legs.position.x = offsetX;
  return legs;
}
const leftLegClothes = createLegClothes(-30);
const rightLegClothes = createLegClothes(30);
/* legClothesPivot.add(leftLegClothes, rightLegClothes); */

// ARTICULATED OBJECTS - FOOT
const footPivot = new THREE.Object3D();
footPivot.position.set(0, -41, 10);
legsPivot.add(footPivot);

function createFoot(offsetX) {
  const footGeometry = new THREE.CapsuleGeometry(15, 20, 4, 8, 1);
  const footMaterial = new THREE.MeshPhongMaterial({
    color: "#48494B",
    wireframe: false,
  });
  const foot = new THREE.Mesh(footGeometry, footMaterial);
  foot.position.x = offsetX;
  foot.rotation.x = Math.PI / 2;
  return foot;
}
const leftFoot = createFoot(-30);
const rightFoot = createFoot(30);
/* footPivot.add(leftFoot, rightFoot); */
leftLeg.add(leftFoot);
leftFoot.position.set(0, -40, 10);
rightLeg.add(rightFoot);
rightFoot.position.set(0, -40, 10);

// ADDING ARTICULATED OBJECTS TO THEIR RESPECTIVE PARTS
leftArm.add(leftHand);
leftHand.position.set(0, -12, 0);

rightArm.add(rightHand);
rightHand.position.set(-1, 30, 0);
rightHand.rotation.z = Math.PI / 100;

leftLeg.add(leftLegClothes);
leftLegClothes.position.set(0, 6, 0);

rightLeg.add(rightLegClothes);
rightLegClothes.position.set(0, 6, 0);

// ROULTETTE BACK - CAPE
const shape = new THREE.Shape();
shape.moveTo(-80, 0);
shape.quadraticCurveTo(-60, -100, -20, -170);
shape.quadraticCurveTo(0, -190, 20, -170);
shape.quadraticCurveTo(60, -100, 80, 0);
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
const capeInterligationGeo = new THREE.CylinderGeometry(3, 3, 159, 20);
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

// GROUND PLANE
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshPhongMaterial({ color: "#4E6BA6", depthWrite: false })
);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

const grid = new THREE.GridHelper(1000, 1000, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

// USEFULL trick to inspect THREE.JS objects
window.camera = camera;

// ANIMATION STATE
let currentState = "Standing";
let emote = null;
let emoteTimer = 0;
const emoteDuration = 0.9;

const expr = { angry: 0, surprised: 0, sad: 0 };

let phase = 0;

// GUI
const gui = new GUI({ width: 300 });

const states = { state: "Standing" };
gui
  .add(states, "state", ["Standing", "Walking", "Running"])
  .name("State")
  .onChange((v) => {
    currentState = v;
  });

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
exprFolder
  .add(expr, "angry", 0, 1, 0.01)
  .name("Angry")
  .onChange(() => {});
exprFolder
  .add(expr, "surprised", 0, 1, 0.01)
  .name("Surprised")
  .onChange(() => {});
exprFolder
  .add(expr, "sad", 0, 1, 0.01)
  .name("Sad")
  .onChange(() => {});
exprFolder.open();

// LIGHTS
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.6);
dir.position.set(100, 200, 100);
dir.castShadow = true;
dir.shadow.camera.near = 0.1;
dir.shadow.camera.far = 500;
scene.add(dir);

// SHADOWS
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// RENDER LOOP
renderer.setAnimationLoop(render);

function updateAnimation(dt) {
  const speed =
    currentState === "Walking" ? 2 : currentState === "Running" ? 8 : 0.5;
  phase += dt * speed;

  const armSwing =
    Math.sin(phase) *
    (currentState === "Standing"
      ? 0.05
      : currentState === "Walking"
      ? 0.3
      : 0.2);

  const legSwing =
    Math.sin(phase + Math.PI) *
    (currentState === "Standing"
      ? 0.05
      : currentState === "Walking"
      ? 0.3
      : 0.2);
  if (typeof leftLeg !== "undefined") {
    leftLeg.rotation.x = legSwing;
    rightLeg.rotation.x = -legSwing;
  }

  if (typeof rightArm !== "undefined") {
    rightArm.rotation.x = armSwing;
  }

  if (emote) {
    emoteTimer += dt;
    const t = emoteTimer / emoteDuration;
    if (emote === "jump") {
      const y = Math.sin(Math.min(t, 1) * Math.PI) * 30;
      cylinder1Pivot.position.y = 181 + y;
      legsPivot.rotation.x = -Math.sin(t * Math.PI) * 0.35;
    } else if (emote === "wave") {
      if (typeof leftArm !== "undefined") {
        leftArm.rotation.z = Math.PI / 12 + Math.sin(t * Math.PI * 4) * 0.2;
      }
    }

    if (emoteTimer >= emoteDuration) {
      emote = null;
      emoteTimer = 0;

      cylinder1Pivot.position.y = 181;
    }
  }

  if (
    typeof eyeMesh !== "undefined" &&
    typeof eyebrowMesh !== "undefined" &&
    typeof eyebrowPivot !== "undefined"
  ) {
    const eyeScaleY =
      1 + expr.surprised * 0.5 - expr.angry * 0.45 - expr.sad * 0.2;
    eyeMesh.scale.set(1, Math.max(0.2, eyeScaleY), 1);

    const baseEyebrowY = 18;
    const eyebrowY =
      baseEyebrowY + expr.surprised * 8 - expr.angry * 4 - expr.sad * 3;
    eyebrowMesh.position.y = eyebrowY;

    const eyebrowTilt = expr.angry * 0.45 - expr.sad * 0.25;
    eyebrowPivot.rotation.set(0, 0, eyebrowTilt);
  }
}

function render(time) {
  if (!render._last) render._last = time;
  const dt = (time - render._last) / 1000;
  render._last = time;

  updateAnimation(dt);
  renderer.render(scene, camera);
}

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
