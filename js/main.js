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
camera.position.set(0, 0, 300);
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
cylinder1Pivot.position.set(0, 20, 0);
scene.add(cylinder1Pivot);

// CYLINDER - BASE OF THE ROULETTE
let cylinder1Geometry = new THREE.CylinderGeometry(80, 80, 14, 60);
let cylinder1Material = new THREE.MeshPhongMaterial({
  wireframe: false,
  map: textureCylinder,
});
let cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
cylinder1Pivot.add(cylinder1);
cylinder1.rotation.x = Math.PI / 2;

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

eyePivot.add(createEye());

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
eyebrowPivot.add(createEyebrow());

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
const rightArm = createArms(98, -10);
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
const rightHand = createArmClothes(92, 40);
rightHand.rotation.z = Math.PI / 12;
armClothesPivot.add(leftHand, rightHand);

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
legClothesPivot.add(leftLegClothes, rightLegClothes);

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
footPivot.add(leftFoot, rightFoot);

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

// USEFULL trick to inspect THREE.JS objects
window.camera = camera;

/* const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const axesHelper2 = new THREE.AxesHelper(2);
cylinder1Pivot.add(axesHelper2);

const axesHelper3 = new THREE.AxesHelper(2);
cylinder1.add(axesHelper3);

const axesHelper4 = new THREE.AxesHelper(2);
circle1Pivot.add(axesHelper4);

const axesHelper5 = new THREE.AxesHelper(2);
circle1.add(axesHelper5);

const axesHelper6 = new THREE.AxesHelper(2);
circle2Pivot.add(axesHelper6);

const axesHelper7 = new THREE.AxesHelper(2);
circle2.add(axesHelper7); */

/* function animate() {
  circle1.rotation.z += 0.01;
  requestAnimationFrame(animate);
}
animate(); */

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.3);
dir.position.set(100, 200, 100);
scene.add(dir);

renderer.setAnimationLoop(render);

function render() {
  renderer.render(scene, camera);
}

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
