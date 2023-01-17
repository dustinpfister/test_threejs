//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const material = new THREE.MeshStandardMaterial({color: 0xff0000,emissive: 0x0a0a0a});
const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),material);
box.position.y=2;
scene.add(box);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), material);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane)
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 15, 10);
camera.lookAt(0, 0, 0);
let frame = 0, maxFrame = 100;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame,
    r = Math.PI * 2 * per;
    // change directional light position
    dl.position.set(Math.cos(r) * 10, 2, Math.sin(r) * 10);
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();