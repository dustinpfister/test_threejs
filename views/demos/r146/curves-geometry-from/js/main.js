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
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(-2,2,-2.5), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(2,2,2.5), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// DEBUG CURVE LINES - just get a state of the curves - also yes this is a demo of 'geometry from curves'
// ---------- ----------
const material_line = new THREE.LineBasicMaterial({ linewidth: 4, color: 0xff0000});
//const line1 = new THREE.Line( new THREE.BufferGeometry().setFromPoints( curve1.getPoints(50) ), material_line );
//scene.add(line1);
//const line2 = new THREE.Line( new THREE.BufferGeometry().setFromPoints( curve2.getPoints(50) ), material_line );
//scene.add(line2);

// ---------- ----------
// GEO - POSITION
// ---------- ----------
const geo = new THREE.BufferGeometry();

// position attribute data
const pos_data = [];
let pi = 0;
const points_per_line = 20;
while(pi < points_per_line){
    const a1 = pi / (points_per_line - 1);
    const v1 = curve1.getPoint(a1);
    const v2 = curve2.getPoint(a1);
    pos_data.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    pi += 1;
}
geo.setAttribute('position', new THREE.Float32BufferAttribute( pos_data, 3 ) );

// normals
geo.computeVertexNormals();


const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ wireframe: false, side: THREE.DoubleSide}))
scene.add(mesh);

// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
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