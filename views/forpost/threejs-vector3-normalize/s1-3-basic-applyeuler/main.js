//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// VECTOR3
//-------- ----------
const v_dir = new THREE.Vector3(0, 0, 18).normalize();
console.log(v_dir.x, v_dir.y, v_dir.z); // 0, 0, 1
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
// using multiply scalar to set unit length, and apply euler to change direction
// on one axis
[
    [1.00, 0], [1.25, 45], [1.50, 90], [1.75, 135],
    [2.00, 180],   [2.25, 225], [2.75, 270], [3.00, 315]
].forEach( (data) => {
    const length = data[0], degree = data[1]
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.075, 10, 10) );
    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(degree)
    mesh.position.copy(v_dir).applyEuler(e).multiplyScalar(length);
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 4, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
