//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH - Using THREE.TorusGeometry for geometry
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 16,
tubeSegments = 32;
const donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());

scene.add(donut); // add mesh to scene
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1.5, 2);
camera.lookAt(0, 0.25, 0);
renderer.render(scene, camera);
