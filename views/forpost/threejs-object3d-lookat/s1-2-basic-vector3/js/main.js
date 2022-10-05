//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUCNTIONS
//-------- ----------
const mkCone = (x, y, z) => {
    const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 20, 20),
        new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(x, y, z)
    return mesh;
};
//-------- ----------
// MESH OBJECTS
//-------- ----------
const m1 = mkCone(0, 0, 0);
scene.add(m1);
const m2 = mkCone(3, 0, 0);
scene.add(m2);
// MAKING THESE TWO MESH OBJECTS LOOK AT EACH OTHER
m1.lookAt(m2.position);
m2.lookAt(m1.position);
// MAKING THE CAMREA LOOK AT M1
camera.position.set(5, 5, 5);
camera.lookAt(m1.position);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
