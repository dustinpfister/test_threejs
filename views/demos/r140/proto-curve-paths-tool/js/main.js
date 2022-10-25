//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// get control point
const getControlPoint = (vStart, vEnd, vDelta) => {
    return vStart.clone().lerp(vEnd, 0.5).add( vDelta );
};
// create curve helper
const createCurve = (vStart, vEnd, vDelta) => {
    vDelta = vDelta || new THREE.Vector3();
    // control point is half way between vStart and vEnd
    vControl = getControlPoint(vStart, vEnd, vDelta);
    return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
};
// create points helper
const createPoints = (curve) => {
    return new THREE.Points(
         (new THREE.BufferGeometry).setFromPoints( curve.getPoints(50) ),
         new THREE.PointsMaterial({ size: 0.4, color: new THREE.Color(0,1,0) })
    );
};

const vStart = new THREE.Vector3(-5, 0, 5)
const vEnd = new THREE.Vector3(-5, 0, -5)
const vDelta = new THREE.Vector3(0, 0, 0)

const curve = new THREE.CurvePath();
curve.add( createCurve( vStart, vEnd, vDelta) );

const points = createPoints(curve);
scene.add(points);

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);

