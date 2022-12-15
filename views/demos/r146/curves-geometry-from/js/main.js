//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 0);
scene.add(dl);
const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(2, -1, 0);
scene.add(dl2);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(-2,2,-4.5), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(2,2,2.5), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// DEBUG CURVE LINES - just get a state of the curves - also yes this is a demo of 'geometry from curves'
// ---------- ----------
//const material_line = new THREE.LineBasicMaterial({ linewidth: 4, color: 0xff0000});
//const line1 = new THREE.Line( new THREE.BufferGeometry().setFromPoints( curve1.getPoints(50) ), material_line );
//scene.add(line1);
//const line2 = new THREE.Line( new THREE.BufferGeometry().setFromPoints( curve2.getPoints(50) ), material_line );
//scene.add(line2);
// ---------- ----------
// GEO POSITION / UV
// ---------- ----------
const geo = new THREE.BufferGeometry();
// position attribute data
const pos_data = [];
const uv_data = [];
let pi = 0;
const points_per_line = 50;
while(pi < points_per_line){
    const a1 = pi / (points_per_line - 1);
    const v1 = curve1.getPoint(a1);
    const v2 = curve2.getPoint(a1);
    pos_data.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    uv_data.push(0, 1, 0, 1);
    pi += 1;
}
geo.setAttribute('position', new THREE.Float32BufferAttribute( pos_data, 3 ) );
geo.setAttribute('uv', new THREE.Float32BufferAttribute( uv_data, 2 ) );
// ---------- ----------
// GEO INDEX
// ---------- ----------
const data_index = [];
let pi2 = 0;
while(pi2 < 50 - 1){
    const a = pi2 * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    data_index.push(b,c,d,c,b,a);
    pi2 += 1;
}


geo.setIndex(data_index);
// ---------- ----------
// GEO NORMAL
// ---------- ----------
geo.computeVertexNormals();
// ---------- ----------
// MATERIAL AND MESH
// ---------- ----------
const material = new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material)
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