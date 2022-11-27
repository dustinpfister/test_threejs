// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, -2);
const copy1 = box.clone();
copy1.scale.set(0.5, 0.5, 0.5);
copy1.position.set(0, 0, 0);
const copy2 = box.clone();
copy2.scale.set(0.25, 0.25, 0.25);
copy2.position.set(0, 0, 1.25);
scene.add(box);
scene.add(copy1);
scene.add(copy2);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
