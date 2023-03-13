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
const createCube = function () {
    var cube = new THREE.Mesh(
           new THREE.BoxGeometry(1, 1, 1),
           new THREE.MeshNormalMaterial());
    return cube;
};
//-------- ---------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const cube1 = createCube();
cube1.position.set(3, 0.5, 2);
scene.add(cube1);
const cube2 = createCube();
cube2.position.set(4, 0.5, -2);
scene.add(cube2);
// doing somehting with distance
const d = cube2.position.distanceTo(cube1.position);
console.log(d);
cube2.scale.set(0, 0, 0)
if (d < 5) {
    const s = 1 - (d / 5); 
    cube2.scale.set(s, s, s);
    cube2.position.y = s / 2;
}
//-------- ---------
// RENDER
//-------- ----------
camera.position.set(8, 2, 8);
camera.lookAt(cube1.position);
renderer.render(scene, camera);

