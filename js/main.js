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

// CYLINDER PIVOT - BACK OF THE ROULETTE
const cylinder1Pivot = new THREE.Object3D();
cylinder1Pivot.position.set(0, 20, 0);
scene.add(cylinder1Pivot);

// CYLINDER - BACK OF THE ROULETTE
let cylinder1Geometry = new THREE.CylinderGeometry(70, 70, 10, 61);
let cylinder1Material = new THREE.MeshPhongMaterial({
  color: "#48494B",
  wireframe: true,
});
let cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
cylinder1Pivot.add(cylinder1);
cylinder1.rotation.x = Math.PI / 2;

// CIRCLE 1 PIVOT - FRONT OF THE ROULETTE
const circle1Pivot = new THREE.Object3D();
circle1Pivot.position.set(0, 0, 5.5);
cylinder1Pivot.add(circle1Pivot);

// CIRCLE 1 - FRONT OF THE ROULETTE
let circle1Geometry = new THREE.CircleGeometry(65, 60);
let circle1Material = new THREE.MeshBasicMaterial({
  color: "#c79a46",
  wireframe: true,
});
let circle1 = new THREE.Mesh(circle1Geometry, circle1Material);
circle1Pivot.add(circle1);

// CIRCLER 2 PIVOT - INNER CIRCLE
const circle2Pivot = new THREE.Object3D();
circle2Pivot.position.set(0, 0, 6);
cylinder1Pivot.add(circle2Pivot);

// CIRCLE 2 - INNER CIRCLE
let circle2Geometry = new THREE.CircleGeometry(20, 60);
let circle2Material = new THREE.MeshPhongMaterial({
  color: "#48494B",
  wireframe: true,
});
let circle2 = new THREE.Mesh(circle2Geometry, circle2Material);
circle2Pivot.add(circle2);

// POINTER PIVOT
const pointerPivot = new THREE.Object3D();
pointerPivot.position.set(0, 0, 7);
cylinder1Pivot.add(pointerPivot);

// POINTER OF THE ROULETTE
let pointerGeometry = new THREE.CylinderGeometry(1, 4, 14, 6);
let pointerMaterial = new THREE.MeshPhongMaterial({
  color: "#48494B",
  wireframe: true,
});
let pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
pointerPivot.add(pointer);
pointer.rotation.x = Math.PI;
pointer.position.set(0, 62.9, 1.5);

// POINTER ARM PIVOT
const pointerArmPivot = new THREE.Object3D();
pointerArmPivot.position.set(0, 69, 0);
pointerPivot.add(pointerArmPivot);

// POINTER ARM
let pointerArmGeometry = new THREE.BoxGeometry(5, 5, 3);
let pointerArmMaterial = new THREE.MeshPhongMaterial({
  color: "#48494B",
  wireframe: true,
});
let pointerArm = new THREE.Mesh(pointerArmGeometry, pointerArmMaterial);
pointerPivot.add(pointerArm);
pointerArm.rotation.x = Math.PI / 2;
pointerArm.position.set(0, 68, 0);

// SLOTS

// ARTICULATED OBJECTS - EYE
const eyePivot = new THREE.Object3D();
eyePivot.position.set(0, 0, 4);
circle2.add(eyePivot);

function createEye() {
  const eyeGeometry = new THREE.SphereGeometry(14, 32, 16);
  const eyeMaterial = new THREE.MeshBasicMaterial({
    color: "#48494B",
    wireframe: true,
  });
  const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  return eye;
}

eyePivot.add(createEye());

// EYEBROW
const eyebrowPivot = new THREE.Object3D();
eyebrowPivot.position.set(0, 18, -2);
eyePivot.add(eyebrowPivot);

function createEyebrow() {
  const eyebrowGeometry = new THREE.BoxGeometry(30, 5, 5);
  const eyebrowMaterial = new THREE.MeshBasicMaterial({
    color: "#48494B",
    wireframe: true,
  });
  const eyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  return eyebrow;
}
eyebrowPivot.add(createEyebrow());

// ARTICULATED OBJECTS - ARMS
const armsPivot = new THREE.Object3D();
armsPivot.position.set(0, -30, -6);
circle2.add(armsPivot);

function createArms(offsetX) {
  const armsGeometry = new THREE.CapsuleGeometry(9, 40, 4, 8, 1);
  const armsMaterial = new THREE.MeshPhongMaterial({
    color: "#48494B",
    wireframe: true,
  });
  const arms = new THREE.Mesh(armsGeometry, armsMaterial);
  arms.position.x = offsetX;
  return arms;
}
const leftArm = createArms(-75);
const rightArm = createArms(75);
armsPivot.add(leftArm, rightArm);

// ARTICULATED OBJECTS - HANDS
const handPivot = new THREE.Object3D();
handPivot.position.set(0, -25, 10);
armsPivot.add(handPivot);
function createHand(offsetX) {
  const handGeometry = new THREE.CapsuleGeometry(9, 20, 4, 8, 1);
  const handMaterial = new THREE.MeshPhongMaterial({
    color: "#48494B",
    wireframe: true,
  });
  const hand = new THREE.Mesh(handGeometry, handMaterial);
  hand.position.x = offsetX;
  hand.rotation.x = Math.PI / 2;
  return hand;
}
const leftHand = createHand(-75);
const rightHand = createHand(75);
handPivot.add(leftHand, rightHand);

// ARTICULATED OBJECTS - LEGS
const legsPivot = new THREE.Object3D();
legsPivot.position.set(0, -106, -6);
circle2.add(legsPivot);

function createLegs(offsetX) {
  const legsGeometry = new THREE.CapsuleGeometry(9, 70, 4, 8, 1);
  const legsMaterial = new THREE.MeshPhongMaterial({
    color: "#48494B",
    wireframe: true,
  });

  const legs = new THREE.Mesh(legsGeometry, legsMaterial);
  legs.position.x = offsetX;
  return legs;
}
const leftLeg = createLegs(-30);
const rightLeg = createLegs(30);
legsPivot.add(leftLeg, rightLeg);

// ARTICULATED OBJECTS - FOOT
const footPivot = new THREE.Object3D();
footPivot.position.set(0, -35, 10);
legsPivot.add(footPivot);

function createFoot(offsetX) {
  const footGeometry = new THREE.CapsuleGeometry(9, 20, 4, 8, 1);
  const footMaterial = new THREE.MeshPhongMaterial({
    color: "#48494B",
    wireframe: true,
  });
  const foot = new THREE.Mesh(footGeometry, footMaterial);
  foot.position.x = offsetX;
  foot.rotation.x = Math.PI / 2;
  return foot;
}
const leftFoot = createFoot(-30);
const rightFoot = createFoot(30);
footPivot.add(leftFoot, rightFoot);

// USEFULL trick to inspect THREE.JS objects
window.camera = camera;

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
