// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);

// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(4,0,5);
const v_end = new THREE.Vector3(-5,0,-4);
const v_c1 = new THREE.Vector3(4, 0,-1);
const v_c2 = new THREE.Vector3(1, 0,-4);
const curve = new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);

let vi = 0;
while(vi < 4){
    const v = curve['v' + vi];
    const e = new THREE.Euler();
    e.y = Math.PI * 0.5;
    v.applyEuler(e);
    vi += 1;
};



const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(29) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);


// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const a3 = ( a2 * 0.98 + 0.01 ) % 1;



    mesh.position.copy( curve.getPoint(a2) );
    mesh.lookAt( curve.getPoint( a3 ) );




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

