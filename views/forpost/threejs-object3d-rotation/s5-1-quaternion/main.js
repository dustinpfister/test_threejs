// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const mkCube = function(){
    return new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
       new THREE.MeshNormalMaterial());
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = mkCube();
scene.add(mesh1);
// ---------- ----------
// SETTING LOCAL ROTATION BY WAY OF QUATERNION RATHER THAN EULER
// ---------- ----------
const v_axis1 = new THREE.Vector3(1,1,-1).normalize();
const radian1 = THREE.MathUtils.degToRad(45);
mesh1.quaternion.setFromAxisAngle(v_axis1, radian1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
