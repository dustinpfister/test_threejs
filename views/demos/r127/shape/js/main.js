 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));

// make the shape
var tri = new THREE.Shape();
tri.moveTo( 0, 1 );
tri.lineTo( 1, -1 );
tri.lineTo( -1, -1 );
// geometry
var extrudeSettings = { depth: 1, bevelEnabled: false};
var geometry = new THREE.ExtrudeGeometry( tri, extrudeSettings );
geometry.rotateX(Math.PI * 1);
// mesh
var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
