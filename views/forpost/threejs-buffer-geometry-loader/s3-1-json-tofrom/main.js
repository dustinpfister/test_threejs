//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BUFFER GEOMETRY TO TEXT
//-------- ----------
const geo = new THREE.SphereGeometry(1, 10, 10);
// make sure to use to non indexed before calling to json
const buffObj = geo.toNonIndexed().toJSON();
const text = JSON.stringify(buffObj);
//-------- ----------
// TEXT TO BUFFER GEOMETRY
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const loader = new THREE.BufferGeometryLoader();
const obj = JSON.parse(text);
const geo2 = loader.parse( obj );
const mesh = new THREE.Mesh(geo2)
scene.add(mesh)
renderer.render(scene, camera)

