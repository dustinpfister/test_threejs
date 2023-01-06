//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
// the array of materials that is only two materials
const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshDepthMaterial()
];
// create the box geometry
const geo = new THREE.BoxGeometry(1, 1, 1);
// The objects in the groups array is what there is to
// use to set material index values for each face
geo.groups.forEach(function (face, i) {
    face.materialIndex = face.materialIndex % materials.length;
});
// now create the box like always passing the geometry first,
// and the array of materials second
const box = new THREE.Mesh(
        geo,
        materials);
scene.add(box)
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = { x: 0, y: 0, z: 0};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.x += 1 * secs;
    state.y += 2 * secs;
    state.z += 3 * secs;
    box.rotation.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    lt = now;
};
loop();