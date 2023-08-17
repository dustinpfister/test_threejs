//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SHAPES
//-------- ----------
const shape1 = new THREE.Shape();
shape1.moveTo(0, -0.5);
shape1.lineTo(1, -2);
shape1.lineTo(-1, -2);
const shape2 = new THREE.Shape();
shape2.moveTo(0, 0.5);
shape2.lineTo(1, 2);
shape2.lineTo(-1, 2);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ExtrudeGeometry( [shape1, shape2] );
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(2, 3, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
