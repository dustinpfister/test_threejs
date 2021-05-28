 
// creating a scene
var scene = new THREE.Scene();

var tri = new THREE.Shape();

tri.moveTo( 0, 25 );
tri.lineTo( 25, -25 );
tri.lineTo( -25, -25 );

var extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

var geometry = new THREE.ExtrudeGeometry( tri, extrudeSettings );
geometry.rotateX(Math.PI * 1)
var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

// add the box mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
