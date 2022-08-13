//****** **********
// SCENE, CAMERA and RENDERER
//****** **********
const scene = new THREE.Scene();
scene.add(  new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

const bones = [];
const a = new THREE.Bone();
const b = new THREE.Bone();
b.position.y = 2;
// adding b as a child of a
a.add(b);
// even though b is a child of a I must push them both to the bones array
bones.push(a, b);
const skeleton = new THREE.Skeleton( bones );

//****** **********
// GEMOERTY and SKINNED MESH
//****** **********
const geometry = new THREE.CylinderGeometry( 2, 2, 1, 30, 30, false );
// buffer geometry must be used with skinned mesh
var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.SkinnedMesh( bufferGeometry, material );
mesh.bind( skeleton );
scene.add( mesh );

//****** **********
// RENDER
//****** **********
renderer.render(scene, camera);
