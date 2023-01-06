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
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box.add(new THREE.BoxHelper(box, new THREE.Color('red'))); // box helper
scene.add(box);
const box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('lime')
        }));
box2.geometry.rotateY(Math.PI * 0.25); // Rotating geometry
box2.add(new THREE.BoxHelper(box2, new THREE.Color('red'))); // box helper
box2.position.set(-2, 0, 0);
scene.add(box2);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0,
    radian: 0,
    r: new THREE.Euler(0, 0, 0),
    p: new THREE.Vector3(0, 0, 0)
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    state.radian = Math.PI * 2 * state.bias;
    state.p.z = -2 * Math.cos(Math.PI * 2 * state.bias);
    state.p.x = 1 + -1 * Math.sin(Math.PI * 8 * state.bias);
    // changing values
    state.r.x += 1 * secs;
    state.r.y += 2 * secs;
    state.r.z += 3 * secs;
    // copy the state of the THREE.Euler instance in the state object
    // as the new rotation value of the box
    box.rotation.copy(state.r);
    // using the copy method for Vector3 also
    box.position.copy(state.p);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
