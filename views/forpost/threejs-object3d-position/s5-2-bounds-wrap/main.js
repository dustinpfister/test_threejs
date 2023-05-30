//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(7, 7, 7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Wrap method based off of the method from Phaser3 
// ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
// * Added some code for case: Wrap(0, 0, 0)
// * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
//
const wrap = function (value, a, b){
    // get min and max this way
    let max = Math.max(a, b);
    let min = Math.min(a, b);
    // return 0 for Wrap(value, 0, 0);
    if(max === 0 && min === 0){
         return 0;
     }
    let range = max - min;
    return (min + ((((value - min) % range) + range) % range));
};
// wrap an axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
    return vec;
};
// Wrap a vector method of public api
const wrapVector = function (vec, vecMin, vecMax) {
    vecMin = vecMin || new THREE.Vector3(-1, -1, -1);
    vecMax = vecMax || new THREE.Vector3(1, 1, 1);
    Object.keys(vec).forEach(function(axis){
        wrapAxis(vec, vecMin, vecMax, axis);
    });
    return vec;
};
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 20, 20),
    new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5})
);
scene.add(mesh1);
scene.add( new THREE.GridHelper(5, 5) );
//-------- ----------
// ANIMATION LOOP
//-------- ----------
const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const V_MIN = new THREE.Vector3(-2, 0, -2);
const V_MAX = new THREE.Vector3(2, 0, 2);
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - (a1 * 8 % 1)) / 0.5;
    const a3 = THREE.MathUtils.smootherstep(a2, 0, 1);
    const unit_length = -8 + 16 * a3;
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a1;
    mesh1.position.set(1,0,0).applyEuler(e).multiplyScalar(unit_length);
    // using the wrap vector method
    wrapVector(mesh1.position, V_MIN, V_MAX)
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
