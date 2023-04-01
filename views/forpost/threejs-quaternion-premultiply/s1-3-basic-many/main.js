// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 1 });
const geometry = new THREE.CylinderGeometry(0, 1, 3, 10, 10);
const mesh1 = new THREE.Mesh( geometry, material);
scene.add(mesh1);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const axis = new THREE.Vector3();
const q = new THREE.Quaternion();
[
    [1,0,0,90],  // x,y,z,degree to be used to set axis and angle
    [0,1,0,112], // can add as many of these as I want
    [1,1,1, 63]
].forEach( (data) => {
    axis.set(data[0], data[1], data[2]).normalize();
    q.setFromAxisAngle(axis, Math.PI / 180 * data[3]);
    mesh1.quaternion.premultiply(q);
});
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
