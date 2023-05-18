//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ORBIT CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
const loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
