//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_sphere = new THREE.SphereGeometry(3.25, 30, 30);
// COMPUTE THE BOUNDING BOX
geo_sphere.computeBoundingBox();
// ADDING A BOX HELPER
const helper = new THREE.Box3Helper(geo_sphere.boundingBox);
helper.material.linewidth = 6;
scene.add(helper)
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const mesh = new THREE.Mesh( geo_sphere, new THREE.MeshNormalMaterial({}) );
scene.add(mesh);
//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);