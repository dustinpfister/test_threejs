//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const color1 = new THREE.Color(0.0,0.5,0.5);
const color2 = new THREE.Color(0.8,0.8,0.8);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material_mesh = new THREE.MeshBasicMaterial({ color: color1 });
const mesh1 = new THREE.Mesh( geometry,material_mesh);
// adding a line as a child of the mesh object
const material_line = new THREE.LineBasicMaterial({ color: color2, linewidth: 6 })
const line1 = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), material_line)
mesh1.add(line1)
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1.5, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
