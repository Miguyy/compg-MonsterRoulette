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
let cylinder1Material = new THREE.MeshBasicMaterial({ color: "#48494B" });
let cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
cylinder1Pivot.add(cylinder1);
cylinder1.rotation.x = Math.PI / 2;

// CIRCLE 1 PIVOT - FRONT OF THE ROULETTE
const circle1Pivot = new THREE.Object3D();
circle1Pivot.position.set(0, 0, 5.5);
cylinder1Pivot.add(circle1Pivot);

// CIRCLE 1 - FRONT OF THE ROULETTE
let circle1Geometry = new THREE.CircleGeometry(65, 60);
let circle1Material = new THREE.MeshBasicMaterial({ color: "#E6BB9B" });
let circle1 = new THREE.Mesh(circle1Geometry, circle1Material);
circle1Pivot.add(circle1);

// CIRCLER 2 PIVOT - INNER CIRCLE
const circle2Pivot = new THREE.Object3D();
circle2Pivot.position.set(0, 0, 6);
cylinder1Pivot.add(circle2Pivot);

// CIRCLE 2 - INNER CIRCLE
let circle2Geometry = new THREE.CircleGeometry(20, 60);
let circle2Material = new THREE.MeshBasicMaterial({ color: "#48494B" });
let circle2 = new THREE.Mesh(circle2Geometry, circle2Material);
circle2Pivot.add(circle2);

// POINTER PIVOT
const pointerPivot = new THREE.Object3D();
pointerPivot.position.set(0, 0, 7);
cylinder1Pivot.add(pointerPivot);

// POINTER OF THE ROULETTE
let pointerGeometry = new THREE.CylinderGeometry(1, 4, 14, 6);
let pointerMaterial = new THREE.MeshBasicMaterial({ color: "#000000" });
let pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
pointerPivot.add(pointer);
pointer.rotation.x = Math.PI;
pointer.position.set(0, 62, 1.8);

// POINTER ARM PIVOT
const pointerArmPivot = new THREE.Object3D();
pointerArmPivot.position.set(0, 68, 0);
pointerPivot.add(pointerArmPivot);

// POINTER ARM
let pointerArmGeometry = new THREE.BoxGeometry(5, 5, 2);
let pointerArmMaterial = new THREE.MeshBasicMaterial({ color: "#000000" });
let pointerArm = new THREE.Mesh(pointerArmGeometry, pointerArmMaterial);
pointerPivot.add(pointerArm);
pointerArm.rotation.x = Math.PI / 2;
pointerArm.position.set(0, 68, 0);

// SLOTS

// USEFULL trick to inspect THREE.JS objects
window.cylinder1 = cylinder1;
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
