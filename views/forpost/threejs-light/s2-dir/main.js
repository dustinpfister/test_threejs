// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ADDING DIRECTIONAL AND AMBIENT LIGHT TO THE SCENE
// ---------- ----------
const dl = new THREE.DirectionalLight(0x2a2a2a, 2.5);
dl.position.set(25, 50, -25);
scene.add(dl);
scene.add(new THREE.AmbientLight(0x2a2a2a, 0.25));
// ---------- ----------
// ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('red') } )
);
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
renderer.render(scene, camera);
