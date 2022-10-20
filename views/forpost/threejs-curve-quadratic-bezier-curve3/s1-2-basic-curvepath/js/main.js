//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE PATH
//-------- ----------
const curvePath = new THREE.CurvePath();
[
    [5,0,5,0,2,-5,5,3,-5], // three each (x,y,z) for start, end, and control points
    [0,2,-5,0,1.5,0,-2,2,3],
    [0,1.5,0,3,1,1,0,-1,-11],
    [3,1,1,0,0,0,3,0,10]
].forEach((a)=>{
    const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
    const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
    const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
    curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// you can just use getPoints as a way to create an array of vector3 objects
// which can be used with the set from points method
const v3Array = curvePath.getPoints(200 / curvePath.curves.length);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x00ff00, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
