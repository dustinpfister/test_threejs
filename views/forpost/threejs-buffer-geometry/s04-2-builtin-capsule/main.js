//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const radius = 1;
const length = 2;
const capsubs = 8;
const radsegs = 16;
const geometry = new THREE.CapsuleGeometry(radius, length, capsubs, radsegs);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);