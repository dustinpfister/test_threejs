// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
// ---------- ----------
// SPOTLIGHT
// ---------- ----------
const color = new THREE.Color('white'),
intensity = 1,
distance = 30,
angle = Math.PI * 0.05,
penumbra = 0.25,
decay = 0.5;
const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
spotLight.position.set(5, 20, 0);
scene.add(spotLight);
scene.add( new THREE.AmbientLight(0xffffff, 0.07));
// ---------- ----------
// MESH OBJECTS
// ---------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
cube.position.set(0, 1, 0);
scene.add(cube);
const mesh_floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshStandardMaterial({
            color: 0x008800
        }));
scene.add(mesh_floor);
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 8, 12);
camera.lookAt(0,0,0);
let secs = 0,
frame = 0,
lt = new Date();
const fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frameMax = 600,
spotTarget = new THREE.Object3D(); // spotlight target
spotLight.target = spotTarget; // set spotLight target for spotLight
scene.add(spotTarget); // add spotLight target to the scene
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    radian = Math.PI * 2 * per;
    spotLight.intensity = 0.1 + bias;
    spotLight.angle = 0.05 + 0.15 * bias;
    spotTarget.position.set( Math.cos(radian) * 3, 0, Math.sin(radian) * 3);
};
// loop
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        update();
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();