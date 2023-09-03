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
const geo_source = new THREE.BoxGeometry();
const threshold_angle = 1;
const geometry = new THREE.EdgesGeometry( geo_source, threshold_angle);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 6 });
const line = new THREE.LineSegments(geometry, material);
scene.add(line);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 2, 4);
camera.lookAt( line.position );
renderer.render(scene, camera);