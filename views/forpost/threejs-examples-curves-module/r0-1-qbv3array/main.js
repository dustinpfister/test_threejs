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
//-------- ----------
// CAMERA PATHS
//-------- ----------
const v3Arrays_meshpos = [ 
    curveMod.QBV3Array([
        [5, 0, 5, -5, 0, -5,    5,0,-5,      100]
    ]),
    curveMod.GlavinPoints2(
        100, // number of points
        new THREE.Vector3(-5, 0, -5), // origin
        new THREE.Vector2(0, 1),      // unit vector length range
        new THREE.Vector2(0, 360),    // a1
        new THREE.Vector2(-90, 90)    // a2
    ),
];
//-------- ----------
// LINES AND POINTS
//-------- ----------
scene.add(curveMod.debugLines(v3Arrays_meshpos) )
scene.add(curveMod.debugPoints(v3Arrays_meshpos) )
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
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     const a1 = frame / frameMax;
     const arrayLen = v3Arrays_meshpos.length;
     const arrayIndex = Math.floor( arrayLen * a1);
     const a2 = a1 - (1 / arrayLen * arrayIndex);
     const a3 = a2 / (1 / arrayLen);
     const v3Array = v3Arrays_meshpos[ arrayIndex ];
     mesh.position.copy( v3Array[ Math.floor( v3Array.length * a3 ) ] );
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