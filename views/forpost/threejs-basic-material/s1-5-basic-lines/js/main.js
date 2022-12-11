//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// USING THE BASIC MATERIAL, BUT ADDING A LINE AS A CHILD OF THE MESH OBJECT
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material_mesh = new THREE.MeshBasicMaterial( { color: new THREE.Color(1,0,0) } );
const material_line = new THREE.LineBasicMaterial( { color: new THREE.Color(1,1,1), linewidth: 4 } );
const box = new THREE.Mesh( geometry, material_mesh);
box.add(new THREE.LineSegments( new THREE.EdgesGeometry(geometry), material_line))
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
