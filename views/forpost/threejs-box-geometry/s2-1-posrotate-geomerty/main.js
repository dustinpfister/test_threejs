//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 1, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH box1
//-------- ----------
const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
);
// ROTATING THE GEOMERTY
box1.geometry.rotateX(Math.PI / 180 * 45);
box1.geometry.rotateY(Math.PI / 180 * 22);
 // TRANSLATING THE GEOMMETRY
box1.geometry.translate(0, 1, 0);
// BOX HELPER
box1.add( new THREE.BoxHelper(box1, new THREE.Color('red')) );
scene.add(box1);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);