// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPERS
// ---------- ---------- ----------
const createCone = () => {
    const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.125, 0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    return mesh;
};
// update a cone position
const updateCone = (mesh, v_home, v_axis, deg, unit_length ) => {
    const radian = Math.PI / 180 * deg;
    mesh.position.copy(v_home).applyAxisAngle(v_axis, radian).normalize().multiplyScalar(unit_length);
    mesh.lookAt(0, 0, 0);
};
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
const V_HOME = new THREE.Vector3(1, 0, 0);
const V_AXIS = new THREE.Vector3(0, 1, 0);
[
    [0, 1], [45, 1], [90, 1], [200, 1], [220, 1],
    [0, 2], [90, 2], [180, 2], [270, 2]
].forEach((data)=>{
    const cone = createCone();
    scene.add(cone);
    updateCone(cone, V_HOME, V_AXIS, data[0], data[1] );
});
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

