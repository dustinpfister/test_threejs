//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
const light = new THREE.PointLight(0xffffff);
light.position.set(1, 2, 4);
scene.add(light);
//-------- ----------
// SCENE CHILDREN
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00
    });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date(),
f = 0,
fm = 300;
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000;
    const p = f / fm,
    b = 1 - Math.abs(0.5 - p) / 0.5;
    requestAnimationFrame(loop);
    // BASIC LERP EXPRESSION between 5,0,0 and -5,0,0
    mesh.position.set(5, 0, 0).lerp(new THREE.Vector3(-5, 0, 0), b);
    // render
    renderer.render(scene, camera);
    f += 30 * secs;
    f %= fm;
    lt = now;
};
loop();
