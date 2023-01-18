// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// ADDING AMBIENT LIGHT TO THE SCENE
// ---------- ----------
const al = new THREE.AmbientLight(0x2a2a2a, 0.5);
scene.add( al );
// ---------- ----------
// ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshStandardMaterial( { color: new THREE.Color('red') } )
);
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
renderer.render(scene, camera);
