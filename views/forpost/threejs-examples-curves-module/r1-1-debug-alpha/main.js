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
const grc_points = [
    [0.00,     0.5],
    [1.00,     0.25],
    [0.50,     -0.5],
    [0.1]
];
//const curveAlpha = curveMod.createAlphaFunciton1( grc_points, true );

const curveAlpha = curveMod.getAlphaFunction( { grc_points: grc_points } );

// ---------- ----------
// OTHER GET ALPHA
// ---------- ----------
/*
// create map linear method
const createMapLinear = function(startAlpha, endAlpha){
    startAlpha = startAlpha === undefined ? 0 : startAlpha;
    endAlpha = endAlpha === undefined ? 0 : endAlpha;
    return function(alpha){
        return THREE.MathUtils.mapLinear(alpha, 0, 1, startAlpha, endAlpha);
    };
};
const getAlpha = (alpha) => {
    return alpha * 8 % 1;
};
const getBias = (alpha) => {
    return 1 - Math.abs(0.5 - (alpha * 1 % 1) ) / 0.5;
};
const getSinBias = function(alpha){
    const b = getBias(alpha * 4 % 1);
    return Math.sin( Math.PI * 0.5 * b );
};
const smoothStep = function(alpha){
    return THREE.MathUtils.smoothstep(alpha, 0, 1);
};
*/
// ---------- ----------
// ALPHA FUNC TO USE
// ---------- ----------
//var alphaFunc = curveAlpha;
//var alphaFunc = getAlpha;
//var alphaFunc = getBias;
//var alphaFunc = getSinBias;
//var alphaFunc = smoothStep;
//var alphaFunc = createMapLinear(0.25, 0.6);
// ---------- ----------
// DEBUG ALPHA FUNC
// ---------- ----------
const points = curveMod.debugAlphaFunction(curveAlpha, { count: 400 });
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