// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SPOTLIGHT
// ---------- ----------
let distance = 10,
angle = Math.PI / 180 * 20,
penumbra = 1,
decay = 0.5;
const light = new THREE.SpotLight(0xffffff, 1, distance, angle, penumbra, decay);
const target = new THREE.Object3D();
const lightHelper = new THREE.SpotLightHelper(light);
light.target = target;
light.add( lightHelper );
scene.add(target);
scene.add(light);
scene.add(new THREE.AmbientLight(0x2a2a2a, 0.3));
// ---------- ----------
// ADDING A FEW MESH OBJECTS TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('cyan') } )
);
mesh1.rotation.x = -1.57;
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30, // fps rate to move camera
frame = 0,
frameMax = 120,
lt = new Date();
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    radian = Math.PI * 2 * per;
    // setting target position
    target.position.set(Math.cos(radian) * 1.5, 0, Math.sin(radian) * 1.5);
    // setting spot light position
    light.position.set(-2 + 4 * bias, 0.25 + 1.25 * bias, 0);
    lightHelper.update();
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
