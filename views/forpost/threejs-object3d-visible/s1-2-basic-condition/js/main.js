//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
const v_home = new THREE.Vector3(1, 0, 0);
const e = new THREE.Euler(0,0,0);
let degree = 45;
let dps = 90;
let lt = new Date();
const fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        e.y = Math.PI / 180 * degree;
        degree += dps * secs;
        delree = THREE.MathUtils.euclideanModulo(degree, 360);

        box.position.copy(v_home).applyEuler(e).normalize();
        box.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
