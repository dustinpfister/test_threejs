//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const radius = 1;
const detail = 0;
const geometry = new THREE.IcosahedronGeometry(radius, detail);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 1, 2);
camera.lookAt( mesh.position );
renderer.render(scene, camera);