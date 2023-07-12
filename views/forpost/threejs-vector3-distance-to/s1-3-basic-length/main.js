//-------- ---------
// SCENE, CAMERA, RNEDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ---------
// HELPER
//-------- ----------
const createMesh = function () {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 30, 30),
        new THREE.MeshNormalMaterial());
    return mesh;
};
//-------- ---------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = createMesh();
scene.add(mesh1);
mesh1.position.set(-5, 0, -2);
mesh1.lookAt(0,0,0);
const unit_length = mesh1.position.length();
const s = unit_length * 0.25;
mesh1.scale.set(s, s, s);
//-------- ---------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

