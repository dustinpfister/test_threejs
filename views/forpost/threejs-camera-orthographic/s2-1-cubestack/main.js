//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ORTHOGRAPHIC CAMERA
//-------- ----------
const width = 3.2,
height = 2.4,
left = width * -1,
right = width,
top2 = height,
bottom = height * -1,
near = 1,
far = 20;
const camera = new THREE.OrthographicCamera( left, right, top2, bottom, near, far);
camera.zoom = 0.75;
camera.updateProjectionMatrix();
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight();
pl.position.set(0, 2, 3);
scene.add(pl); 
//-------- ----------
// CUBE STACK
//-------- ----------
const stack = new CubeStack({
        boxCount: 25
    });
stack.group.position.set(0, 0.5, 0);
scene.add(stack.group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 3 + Math.sin(radian) * 2,
    z = Math.sin(radian) * 5;
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();