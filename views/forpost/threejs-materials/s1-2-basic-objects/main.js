//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_mesh = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const material_line = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 6});
const material_points = new THREE.PointsMaterial({ color: 0xff0000, size: 0.25 });
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry_edge = new THREE.EdgesGeometry( geometry );
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( geometry, material_mesh );
mesh.add( new THREE.LineSegments( geometry_edge, material_line ) );
mesh.add( new THREE.Points( geometry_edge, material_points ) );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

