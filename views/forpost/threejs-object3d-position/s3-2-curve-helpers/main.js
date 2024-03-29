//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS - from 'frink3' project in videoground-beta-world
//           ( https://github.com/dustinpfister/videoground-beta-world )
//-------- ----------
// just a short hand for THREE.QuadraticBezierCurve3
const QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
    let vs = x1;
    let ve = y1;
    let vc = z1;
    if(arguments.length === 9){
        vs = new THREE.Vector3(x1, y1, z1);
        ve = new THREE.Vector3(x2, y2, z2);
        vc = new THREE.Vector3(x3, y3, z3);
    }
    return new THREE.QuadraticBezierCurve3( vs, vc, ve );
};
// QBDelta helper using QBC3
// this works by giving deltas from the point that is half way between
// the two start and end points rather than a direct control point for x3, y3, and x3
const QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    const vs = new THREE.Vector3(x1, y1, z1);
    const ve = new THREE.Vector3(x2, y2, z2);
    // deltas
    const vDelta = new THREE.Vector3(x3, y3, z3);
    const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
    const curve = QBC3(vs, ve, vc);
    return curve;
};
//-------- ----------
// CURVE
//-------- ----------
const curve = QBC3(0, 0, 5, 0, 0, -5, -20, 6, 4.5);
//-------- ----------
// OBJECTS
//-------- ----------
// mesh object that will be positioned along the curve
const MESH_COUNT = 10;
const POINT_COUNT = 100;
let i = 0;
while(i < MESH_COUNT){
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.75, 0.75),
        new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5}));
    const a1 = Math.round(i / MESH_COUNT * POINT_COUNT) / (POINT_COUNT - POINT_COUNT / MESH_COUNT );
    const a2 = a1; //0.1 + a1 * 0.9;
    // USING THE getPoint METHOD OF THE CURVE TO GET a Vector3
    // OBJECT THAT I CAN THEN USE WITH THE COPY METHOD TO SET
    // THE STATE OF THE POSITION OF THIS MESH OBJECT
    const v3 =  curve.getPoint( a2);
    mesh.position.copy( v3 );
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
    i += 1;
}
// grid helper
const grid = new THREE.GridHelper(10, 10);
scene.add(grid);
// points to get an indea of what the deal is with the curve
const points = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints( curve.getPoints(POINT_COUNT) ),
    new THREE.PointsMaterial({size: 0.125, color: new THREE.Color(0, 1, 0)})
);
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
