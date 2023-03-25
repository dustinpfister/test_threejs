//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
//-------- ----------
// MESH
//-------- ----------
// creating a cube and adding it to the scene
const cube = createCube();
scene.add(cube);
// USING THE APPLY EULER Vector3 METHOD
const e = new THREE.Euler(
    THREE.MathUtils.degToRad(0),
    THREE.MathUtils.degToRad(45), 
    THREE.MathUtils.degToRad(0));
const v = new THREE.Vector3(2, 0, 0).applyEuler(e);
cube.position.copy(v);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
