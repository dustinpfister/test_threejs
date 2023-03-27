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
const mkObject = function(){
    const material = new THREE.MeshNormalMaterial({});
    const mesh_body = new THREE.Mesh(
       new THREE.SphereGeometry(0.5, 20, 20),
       material);
    const mesh_nose = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.25, 1, 20, 20),
        material
    );
    mesh_nose.geometry.translate(0,1,0);
    mesh_body.add(mesh_nose);
    const mesh_wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.125,0.3,3),
        material
    );
    mesh_body.add(mesh_wing);
    const mesh_tail = new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.4,0.125),
        material
    );
    mesh_tail.geometry.translate(0.75,0,0);
    mesh_tail.geometry.rotateZ(Math.PI / 180 * -60);
    mesh_body.add(mesh_tail);
    return mesh_body;
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const obj1 = mkObject();
scene.add(obj1);
obj1.rotation.z = Math.PI * 0.0;
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
