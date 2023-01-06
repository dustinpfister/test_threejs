//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'orange'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'purple'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    }),
    new THREE.MeshBasicMaterial({
        color: 'cyan'
    })
];
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materials);
scene.add(box)
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    x: 0,
    y: 0,
    z: 0
};
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