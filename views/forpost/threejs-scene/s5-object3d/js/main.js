// CREATE A SCENE
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// LOOP
let frame = 0,
maxFrame = 50;
const loop = function () {
    const per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    // using Object3D properties to change
    // the position and rotation of a scene
    scene.position.set(0, 1 * bias, 0);
    scene.rotation.set(Math.PI * 2 * per, 0, 0);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
