// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(2,2,2);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// Hemisphere Light
// ---------- ----------
const hl = new THREE.HemisphereLight( 0x00afff, 0xffaf00, 1 );
scene.add( hl );
// ---------- ----------
// ADDING MESH OBJECT TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('white') } )
);
mesh1.rotation.set(0, Math.PI * 1.95, Math.PI * 0.35)
scene.add(mesh1);
// ---------- ----------
// RENDER static scene
// ---------- ----------
renderer.render(scene, camera);
