//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLR1enderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GROUP, MESH, HELPER
//-------- ----------
const group = new THREE.Group();
scene.add(group);
// BOX
const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 1), new THREE.MeshNormalMaterial());
group.add(mesh)
// SHAPE
const tri = new THREE.Shape();
tri.moveTo(-1, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
const extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
const geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.position.set(0, 2.0, 0);
mesh.rotation.set(0, 0, Math.PI * 0.5);
// add the mesh to the group
group.add(mesh);
group.add(new THREE.BoxHelper(group));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
