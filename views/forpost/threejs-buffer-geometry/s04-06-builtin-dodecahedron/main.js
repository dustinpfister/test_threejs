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
const detail = 0;
const geometry = new THREE.DodecahedronGeometry(radius, detail);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({  });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.lookAt( 0, 0, 1);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);