//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
const setPosByDirAndLength = function(obj, dir, len){
    const v = dir.normalize().multiplyScalar(len);
    return obj.position.copy(v);
};
//-------- ----------
// OBEJCTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh1 = createCube();
scene.add(mesh1);
const dir = new THREE.Vector3(-5, 5, -5);
setPosByDirAndLength(mesh1, dir, 4);
console.log( mesh1.position.length() ); // 4
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

