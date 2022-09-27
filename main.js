import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(35);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(16, 4, 12, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x857b25 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights
var plx = 0;
var speed = 0.6;
var plxMax = 20;
var moveRight = true;
const pointLight = new THREE.PointLight(0x2a13ed, 5);
pointLight.position.set(plx, 0, 0);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

function rotateTorus() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
}

function animatePointLight() {
  if (moveRight) {
    plx += speed;
    if ( plx > plxMax) {
      moveRight = false;
    }
  }
  else {
    plx -= speed;
    if ( plx < -plxMax) {
      moveRight = true;
    }
  }
  pointLight.position.set(plx, 0, 0);
}


function animate() {
  requestAnimationFrame(animate);

  rotateTorus();
  animatePointLight();

  renderer.render(scene, camera);
}

animate();