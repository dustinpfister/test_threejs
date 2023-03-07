//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
const mesh1 = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
mesh1.position.set(3, 0.5, 0);
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
// using the length method to get the unit length of mesh1
// using normalize to get a vector with a length of one from that position
// and using the vector3 lerp method to get vector3 objects between the two
const mesh_unit_length = mesh1.position.length();
const v2 = mesh1.position.clone().normalize();
let i = 0, count = 5;
while(i < count){
    const alpha = ( i + 1 ) / count;
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
    mesh.position.copy(mesh1.position).lerp(v2, alpha);
    scene.add(mesh);
    i += 1;
};
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
