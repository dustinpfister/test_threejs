import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(25, 10, 0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
//-------- ----------
// HELPERS
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
// QBV3Array
const QBV3Array = function(data) {
    const v3Array = [];
    data.forEach( ( a ) => {
        const curve = QBDelta.apply(null, a.slice(0, a.length - 1))
        v3Array.push( curve.getPoints( a[9]) );
    })
    return v3Array.flat();
};
// get head tail alpha
const getHTAlpha = (alpha, sa1, ea1, sa2, ea2) => {
    sa1 = sa1 === undefined ? 0 : sa1;
    ea1 = ea1 === undefined ? 0.15 : ea1;
    sa2 = sa2 === undefined ? 0.85 : sa2;
    ea2 = ea2 === undefined ? 1 : ea2;
    if(alpha > sa1 && alpha < ea1){
        const a = alpha - sa1;
        return a / (ea1 - sa1);
    }
    if(alpha > sa2 && alpha < ea2){
        const a = alpha - sa2;
        return 1 - a / (ea2 - sa2);
    }
    if(alpha >= ea1 && alpha <= sa2){ return 1; }
    // default return value is 0
    return 0;
};
// Glavin Points are random points used for camera pos
const GlavinPoints2 = (count, origin, VULR, A1, A2 ) => {
    count = count === undefined ? 50 : count;
    origin = origin === undefined ? new THREE.Vector3() : origin;
    VULR = VULR === undefined ? new THREE.Vector2(0, 1) : VULR; // Max and min unit vector length
    A1 = A1 === undefined ? new THREE.Vector2(0, 360) : A1;
    A2 = A2 === undefined ? new THREE.Vector2(-90, 90) : A2;
    const v3Array = [];
    let i  = 0;
    while(i < count){
        // random euler
        const e = new THREE.Euler();
        e.x = Math.PI / 180 * ( A1.x + ( A1.y - A1.x ) * THREE.MathUtils.seededRandom() );
        e.y = Math.PI / 180 * ( A2.x + ( A2.y - A2.x ) * THREE.MathUtils.seededRandom() );
        //e.y = Math.PI * 2 * THREE.MathUtils.seededRandom();
        // random unit length
        const ul = VULR.x + ( VULR.y - VULR.x ) * THREE.MathUtils.seededRandom();
        // v3 is a random dir and unit length from origin
        const v = origin.clone().add( new THREE.Vector3( 0, 0, 1).applyEuler(e).multiplyScalar(ul) )
        v3Array.push(v);
        i += 1;
    }
    return v3Array;
};
//-------- ----------
// CAMERA PATHS
//-------- ----------
const v3Array_campos = [ 
    // seq 0
    QBV3Array([
        [-8,6,0, 0,6,12,    0,0,10,      60],
        [0,6,12, 0,5,10,    0,0,0,      30]
    ]),
    // seq 1
    GlavinPoints2(400, new THREE.Vector3(0,5,10), new THREE.Vector2(0, 2)),
    // seq 2
    QBV3Array([
        [0,5,10, 10,0,0,    6,2,9,      210]
    ]),
    // seq 3
    GlavinPoints2(800, new THREE.Vector3(10,0,0), new THREE.Vector2(0, 4)),
    // seq 4
    QBV3Array([
        [10,0,0, 0,0,-7,    6,0,-6,      120]
    ]),
    // seq 5
    GlavinPoints2(1600, 
        new THREE.Vector3(0,0,-7), // origin
        new THREE.Vector2(0, 20),  // vector unit length range
        new THREE.Vector2(160, 200),
        new THREE.Vector2(-25, 25)
    )
];
// LINE
const line_debug = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(v3Array_campos.flat()),
    new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3})
);
scene.add(line_debug);
// POINTS
const points_debug = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(v3Array_campos.flat()),
    new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0, 1, 0)})
);
scene.add(points_debug);
//-------- ----------
//  RENDER
//-------- ----------
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();