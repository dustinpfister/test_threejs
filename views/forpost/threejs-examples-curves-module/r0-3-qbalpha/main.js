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
// CURVE ALPHA
// ---------- ----------
const grc_points = [
    [0.00, 0],[1.00, 0.25], [0.50, -0.2], [0]
];
const curveAlpha = curveMod.createAlphaFunciton2( grc_points, false );


//-------- ----------
// CURVE PATH
//-------- ----------
const cp_meshpos = curveMod.QBCurvePath([
   [5, 1, 5, -5, 1, -5,    5,0,-5]
]);

// ---------- ----------
// DEBUG POINTS
// ---------- ----------
const pointsA = curveMod.debugAlphaFunction(curveAlpha, { count: 400, color: new THREE.Color(1, 1, 1) });
scene.add(pointsA);
const pointsM = curveMod.debugPointsCurve(cp_meshpos, { getAlpha: curveAlpha, color: new THREE.Color(0, 1, 0) });
scene.add(pointsM);

//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 30, 30),
    new THREE.MeshNormalMaterial()
);
scene.add(mesh2);
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
     if(a2 < 0 || a2 > 1){
        console.log( 'out!' )
     }
     // useing mesh to to show point along get alpha
     mesh2.position.x = -5 + 10 * a1;
     mesh2.position.z = 5 - 10 * a2;
     // using mesh1 to show how that can apply to the point
     // spacing along another curve
     mesh1.position.copy( cp_meshpos.getPoint(a2) );
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