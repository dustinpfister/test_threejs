// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const x = 0, y = 0;
const radius1 = 6, radius2 = 3;
const curve = new THREE.EllipseCurve(x, y, radius1, radius2, Math.PI * 1.5, Math.PI * 0.5, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 50;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 50;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
// light
const dl = new THREE.DirectionalLight(0xffffff, 0.8);
dl.position.set(-7,5,3)
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.005);
scene.add(al);
// mesh
const material = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x8a8a8a});
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(9, 6, 9);
camera.lookAt(0, -1, 0);
renderer.render(scene, camera);
