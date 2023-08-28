// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo_source = new THREE.ConeGeometry(0.5, 1, 20, 20);
const geo1 = geo_source.clone().rotateX( Math.PI / 180 * 45 ).translate(-2,0,0);
const geo2 = geo_source.clone();
// ---------- ----------
// MATERIAL, MESH, GRID
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geo1, material);
const mesh2 = new THREE.Mesh(geo2, material);
scene.add(mesh1, mesh2, new THREE.GridHelper(10,10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

