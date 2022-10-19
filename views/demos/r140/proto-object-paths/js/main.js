//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LineCurve3
//-------- ----------


const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(0, 2, -5);
const vControl = new THREE.Vector3(5, 2, -5);
const curve = new THREE.QuadraticBezierCurve3( v1, vControl, v2);
// cretaing a v3 array with the curve
/*
const len = 3;
const v3Array = [];
let i = 0;
while(i <= len){
    v3Array.push( curve.getPoint( i / len) );
    i += 1;
}

console.log(v3Array);
*/
// you can just use get points
const v3Array = curve.getPoints(30);
console.log();
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff0000, size: 0.25 }));
scene.add(points);

//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );

//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);