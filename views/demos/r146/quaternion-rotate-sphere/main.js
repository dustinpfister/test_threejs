// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// helper functions
// ---------- ----------
const getAxisFromQuaternion = (q) => {
  let s = 1;
  if ( !(1 - q.w * q.w < Number.MIN_VALUE) ) {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return new THREE.Vector3(q.x / s, q.y / s, q.z / s);
};
const getRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
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
camera.position.set(2, 1, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v_up = new THREE.Vector3(0, 1, 0);


const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 0.75 - 0.75 * a1; //1 - Math.abs(0.5 - (a1 * 4 % 1)) / 0.5;
    const a3 = a1 * 1 % 1;
    const a4 = a1 * 6 % 1;


    const v_axis = v_up.clone();
    const e = new THREE.Euler();
    e.y = Math.PI / 180 * ( 180 * a2);
    e.z = Math.PI / 180 * ( 360 * a3 );
    v_axis.applyEuler(e);


    const q1 = new THREE.Quaternion();
    q1.setFromUnitVectors(v_up, v_axis);
    mesh1.quaternion.copy(q1);

    const q2 = new THREE.Quaternion();
    q2.setFromAxisAngle(v_axis, Math.PI * 2 * a4);

    //mesh1.quaternion.copy(q1);
    //mesh1.quaternion.copy(q2);
    //mesh1.quaternion.multiplyQuaternions(q1, q2);
    mesh1.quaternion.premultiply(q2, q1);

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

