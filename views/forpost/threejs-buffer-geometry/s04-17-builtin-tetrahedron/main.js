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
const radius=1, detail=0;
const geometry = new THREE.TetrahedronGeometry(radius, detail);
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
camera.position.set(1.2, 1.2, 1);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);