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
// LOOP - update method with crude scene shake effect
//-------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 50;
const update = () => {
    const v_length = 0.1 + 0.1 * Math.random();
    const v_dir = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
    // setting the position of the whole scene
    scene.position.copy(v_dir).multiplyScalar(v_length);
};
const loop = () => {
    const per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    update();
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
