//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 1, -3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// USING THE THREE.VertexNormalsHelper METHOD
const helper = new THREE.VertexNormalsHelper( box, 2, 0x00ff00, 1 );
scene.add(helper);
//-------- ----------
// UISNG ORBIT CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0
};
const update = function (secs, per, bias, state) {
    helper.update();
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    update(secs, state.per, state.bias, state);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();