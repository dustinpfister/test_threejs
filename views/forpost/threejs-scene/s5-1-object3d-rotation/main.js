//-------- ----------
// CREATE A SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 50;
const loop = function () {
    const per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    // using Object3D properties to change
    // the rotation of a scene
    scene.rotation.set(Math.PI * 2 * per, 0, 0);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
