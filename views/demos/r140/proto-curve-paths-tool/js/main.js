//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// get control point
//const getControlPoint = (vStart, vEnd, vDelta) => {
//    return vStart.clone().lerp(vEnd, 0.5).add( vDelta );
//};
// create curve helper
const createCurve = (vStart, vEnd, vDelta) => {
    vDelta = vDelta || new THREE.Vector3();
    return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
};
// create points helper
const createPoints = (curve) => {
    return new THREE.Points(
         (new THREE.BufferGeometry).setFromPoints( curve.getPoints(50) ),
         new THREE.PointsMaterial({ size: 0.4, color: new THREE.Color(0,1,0) })
    );
};
// create mesh helper
const createMesh = () => {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 20, 20),
        new THREE.MeshNormalMaterial()
    );
    return mesh;
};
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh_start = createMesh();
const mesh_end = createMesh();
const mesh_control = createMesh();
scene.add(mesh_start);
scene.add(mesh_end);
scene.add(mesh_control);
//-------- ----------
// CURVE POINTS
//-------- ----------
const vStart = new THREE.Vector3(-5, 0, 5);
const vEnd = new THREE.Vector3(-5, 0, -5);
const vControl = new THREE.Vector3(15, 0, 0);
const curve = new THREE.CurvePath();
curve.add( createCurve( vStart, vEnd, vControl) );
const points = createPoints(curve);
scene.add(points);

mesh_start.position.copy(vStart);
mesh_end.position.copy(vEnd);
mesh_control.position.copy(vControl);

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);

