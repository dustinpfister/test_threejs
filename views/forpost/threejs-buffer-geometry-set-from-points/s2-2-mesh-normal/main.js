// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 1.5,-1.5, 0.0),
    new THREE.Vector3(-1.5,-1.5, 0.0),
    new THREE.Vector3( 0.0, 1.5, 0.0),
    new THREE.Vector3( 0.0, 0.0,-6.0),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
// geo one with index using only 4 points
const geo1 = new THREE.BufferGeometry();
geo1.setFromPoints(points);
geo1.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
geo1.computeVertexNormals();
// non indexd geo from an indexed one
const geo2 = geo1.toNonIndexed();
geo2.computeVertexNormals();
// ---------- ----------
// Mesh, MeshNormalMaterial
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geo1, material);
mesh1.position.set(-2,0,0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo2, material);
mesh2.position.set(2,0,0);
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

