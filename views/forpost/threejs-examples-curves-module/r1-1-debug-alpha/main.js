//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
// ---------- ----------
// CURVE ALPHA FUNCTION
// ---------- ----------
const ac_points = [
    0.00,     0.5,
    1.00,     0.25,
    0.50,     -0.5,
    0.1
];
const curveAlpha = curveMod.getAlphaFunction({
    //type: 'curve2',
    type: function(alpha){ return alpha < 0.5 ? alpha / 0.5 : 1 },
    ac_points: ac_points
});
//curveAlpha.opt.ac_points[2] = 0.5;
// ---------- ----------
// DEBUG ALPHA FUNC
// ---------- ----------
const points = curveMod.debugAlphaFunction(curveAlpha, { });
scene.add(points);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 180;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     const a1 = frame / frameMax;
     const a2 = curveAlpha(a1);
     mesh.position.x = -5 + 10 * a1;
     mesh.position.z = 5 - 10 * a2;

     // state feature works
     //const a3 = curveMod.getAlpha('bias', frame, frameMax, 20);
     //curveAlpha.opt.ac_points[2] = 0.5 + 0.5 * a3;

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