//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// TEST VECTOR2
//-------- ----------
// works well with Vector2
const v = new THREE.Vector2(5, 2);
console.log( wrapVector( v , new THREE.Vector2(-3, -3), new THREE.Vector2(3, 3) ) );
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, 0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, -1.5);
scene.add(mesh2);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const vMin = new THREE.Vector3(-2, -1, -2),
vMax  = new THREE.Vector3(2, 1, 2);
let frame = 0,lt = new Date();
const maxFrame = 300, fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // warp one axis
        mesh1.position.x += (-5 + 10 * bias) * secs;
        mesh2.position.y += (-5 + 10 * bias) * secs;
        // wrap vector
        wrapVector(mesh1.position, vMin, vMax);
        wrapVector(mesh2.position, vMin, vMax);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();

