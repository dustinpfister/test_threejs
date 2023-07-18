//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// POINTS - Using THREE.TorusGeometry and PointsMaterial
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 64,
tubeSegments = 256;
const doughnut = new THREE.Points(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.PointsMaterial({size: 0.0125, color: 0x00ff00}));
scene.add(doughnut); // add mesh to scene
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0.25, 0);
renderer.render(scene, camera);
