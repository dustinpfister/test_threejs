// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(-0.5, 5, 5);
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
const geo_source = new THREE.BufferGeometry();
geo_source.setFromPoints(points);
geo_source.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
// non indexd geo from an indexed one
const geo = geo_source.toNonIndexed();
geo.computeVertexNormals();
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.2,1,0.1)
scene.add(dl);
// ---------- ----------
// Mesh, MeshPhongMaterial
// ---------- ----------
const material = new THREE.MeshPhongMaterial();
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

