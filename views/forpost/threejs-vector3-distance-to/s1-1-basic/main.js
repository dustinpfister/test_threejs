//-------- ---------
// SCENE, CAMERA, RNEDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ---------
// VECTORS
//-------- ----------
const v1 = new THREE.Vector3(-4, 0, 2);
const v2 = new THREE.Vector3( 3, 0, 0);
//-------- ---------
// DISTANCE
//-------- ----------
const d = v1.distanceTo( v2 );
console.log(d); // 6
//-------- ---------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const len = Math.ceil(d);
let i = 0;
while(i < len){
   const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.2) );
   mesh.position.copy(v1).lerp(v2, i / len);
   scene.add(mesh);
   i += 1;
}
//-------- ---------
// RENDER
//-------- ----------
camera.position.set( 5, 5, 5 );
camera.lookAt( 0, 0, 0);
renderer.render(scene, camera);

