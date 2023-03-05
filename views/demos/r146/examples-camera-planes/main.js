// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );


//-------- ----------
// MESH
//-------- ----------
const material_plane = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide
});
const geometry_plane = new THREE.PlaneGeometry(1, 1, 1, 1);
const mesh_plane_1 = new THREE.Mesh(geometry_plane, material_plane);
mesh_plane_1.scale.set(
   camera.aspect,
   1,
   1
);
const group = new THREE.Group();
group.add(mesh_plane_1);
group.add(camera);
camera.position.set(0, 0, 1);
camera.lookAt(group.position);
scene.add(group);
// ---------- ----------
// RENDER
// ---------- ----------
group.position.set(5,1,-3);
group.rotation.y = Math.PI / 180 * 45;
renderer.render(scene, camera);
