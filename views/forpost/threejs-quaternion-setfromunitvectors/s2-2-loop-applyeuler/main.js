// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const canvas_3d = renderer.domElement;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh1 = new THREE.Mesh( geometry, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry, material);
mesh2.scale.set(0.25, 0.25, 0.25);
scene.add(mesh2);
// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, canvas_2d);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,     // 30.888 / 450
   frame: 0,          // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = Math.sin( Math.PI * (a1 * 32 % 1) );
    const e2 = new THREE.Euler(0, 0, 0);
    e2.y = Math.PI / 180 * (360 * a1);
    e2.z = Math.PI / 180 * (90 * Math.sin( Math.PI * 8 * a1 ) ) ;
    const radius2 = 3 + 1.5 * a2;
    mesh2.position.set(1, 0, 0).applyEuler(e2).multiplyScalar(radius2);
    const v_from = new THREE.Vector3(0, 1, 0);
    const v_to = mesh2.position.clone().normalize();
    mesh1.quaternion.setFromUnitVectors(v_from, v_to);

};
const render2d = (sm) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('frame: ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();


/*
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh1 = new THREE.Mesh( geometry, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry, material);
mesh2.scale.set(0.25, 0.25, 0.25);
scene.add(mesh2);
// ---------- ----------
// SET MESH2 POSITION - using euler objects amd vector3 class methods
// ---------- ----------
const e2 = new THREE.Euler(0, 0, 0);
e2.y = Math.PI / 180 * 270;
e2.z = Math.PI / 180 * 40;
let radius2 = 3.5;
mesh2.position.set(1, 0, 0).applyEuler(e2).multiplyScalar(radius2);
// ---------- ----------
// ROTATE MESH1 WITH QUATERNIONS
// ---------- ----------
const v_from = new THREE.Vector3(0, 1, 0);
const v_to = mesh2.position.clone().normalize();
mesh1.quaternion.setFromUnitVectors(v_from, v_to);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
*/
