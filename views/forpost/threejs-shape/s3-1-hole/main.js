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
// SHAPE, GEOMETRY
//-------- ----------
const tri = new THREE.Shape();
tri.moveTo(0, 2);
tri.lineTo(2, -2);
tri.lineTo(-2, -2);
// add the hole
const hole = new THREE.Shape();
hole.arc(0, -0.8, 1.0, 0, Math.PI * 2);
// push to the shapes holes array
tri.holes.push(hole);
// geometry
const extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
const geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
