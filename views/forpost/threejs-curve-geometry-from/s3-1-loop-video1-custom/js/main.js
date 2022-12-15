//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// get position data array helper
const getCurvePosData = (curve1, curve2, points_per_line) => {
    points_per_line = points_per_line === undefined ? 50 : points_per_line;
    const pos_data = [];
    let pi = 0;
    while(pi < points_per_line){
        const a1 = pi / (points_per_line - 1);
        const v1 = curve1.getPoint(a1);
        const v2 = curve2.getPoint(a1);
        pos_data.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        pi += 1;
   }
   return pos_data;
};
// get uv data array helper
const getCurveUVData = (curve1, curve2, points_per_line) => {
    points_per_line = points_per_line === undefined ? 50 : points_per_line;
    const uv_data = [];
    let pi = 0;
    while(pi < points_per_line){
        const a1 = pi / (points_per_line - 1);
        uv_data.push(a1, 0, a1, 1);
        pi += 1;
   }
   return uv_data;
};
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
c1_control = new THREE.Vector3(0, 5, 0), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(0, -5, 0), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// GEO POSITION / UV
// ---------- ----------
const geo = new THREE.BufferGeometry();
const pos_data = getCurvePosData(curve1, curve2, 20);
const uv_data = getCurveUVData(curve1, curve2, 20);
geo.setAttribute('position', new THREE.Float32BufferAttribute( pos_data, 3 ) );
geo.setAttribute('uv', new THREE.Float32BufferAttribute( uv_data, 2 ) );
// ---------- ----------
// GEO INDEX
// ---------- ----------
const data_index = [];
let pi2 = 0;
while(pi2 < 20 - 1){
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
// TEXTURE
// ---------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
const width = 128, height = 128;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    // x and y pos
    const xi = i % width;
    const yi = Math.floor(i / width);
    const v2 = new THREE.Vector2(xi, yi);
    // alphas
    const a_rnd1 = THREE.MathUtils.seededRandom();
    const a_rnd2 = THREE.MathUtils.seededRandom();
    const a_rnd3 = THREE.MathUtils.seededRandom();
    let a_dist = v2.distanceTo( new THREE.Vector2( width * 0.25, height * 0.75) ) / (width / 16);
    a_dist = a_dist % 1;
    const a_x = xi / width;
    const a_y = yi / height;
    const cv = 255 * (a_dist);
    // red, green, blue, alpha
    data[ stride ] = cv;
    data[ stride + 1 ] = 0;
    data[ stride + 2 ] = 255 - cv;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// ---------- ----------
// MATERIAL AND MESH
// ---------- ----------
const material = new THREE.MeshPhongMaterial({ map: texture, wireframe: false, side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
const line = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({linewidth: 4, color: 0x000000}));
mesh.add(line);
line.position.y = 0.025;
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