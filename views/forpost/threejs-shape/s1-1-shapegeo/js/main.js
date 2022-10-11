//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
const tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
const geometry = new THREE.ShapeGeometry(tri);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
renderer.render(scene, camera);
