//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// CAMERA
//-------- ----------
const left = -3.2, right = 3.2,
top2 = 2.4, bottom = -2.4,
near = 0.01, far = 100;
const camera = new THREE.OrthographicCamera(left, right, top2, bottom, near, far);
// mesh
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
