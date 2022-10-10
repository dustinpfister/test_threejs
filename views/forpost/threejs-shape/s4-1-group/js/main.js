
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));

// GROUP
var group = new THREE.Group();
scene.add(group);

// BOX
var mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 1), new THREE.MeshNormalMaterial());
group.add(mesh)

// SHAPE
var tri = new THREE.Shape();
tri.moveTo(-1, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
var extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
var geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.position.set(0, 2.0, 0);
mesh.rotation.set(0, 0, Math.PI * 0.5);

// add the mesh to the group
group.add(mesh);
group.add(new THREE.BoxHelper(group));

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
