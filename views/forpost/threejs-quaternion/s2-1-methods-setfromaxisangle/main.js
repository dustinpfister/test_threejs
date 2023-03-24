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
scene.add( new THREE.GridHelper( 10,10 ) );
const geo = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 3});
const mesh1 = new THREE.Mesh( geo, material);
scene.add(mesh1);
const arrowHelper = new THREE.ArrowHelper();
arrowHelper.setLength(1.5);
arrowHelper.line.material.linewidth = 6;
scene.add(arrowHelper);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-2, 2, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v_axis = new THREE.Vector3(0, 1, 0);
const e = new THREE.Euler();
e.z = Math.PI / 180 * 22;
v_axis.applyEuler(e);
mesh1.geometry.rotateZ(e.z); // can rotate the geometry once two if i want
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    mesh1.quaternion.setFromAxisAngle( v_axis, Math.PI * 2 * a1 );
    arrowHelper.setDirection(v_axis);
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

