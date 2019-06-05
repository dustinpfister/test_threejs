// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(0, 0, -2);
camera.lookAt(0, 0, 0);

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

// FACE 3
var geometry = new THREE.Geometry();
geometry.vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(1, 0, 0)
];
var colors = [
    new THREE.Color(0xff0000),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff)];
var normal = new THREE.Vector3(0, 0, 1);
// set a single color for a face3 instance
geometry.faces.push(new THREE.Face3(0, 1, 2, normal, colors[0], 0));
// set an array of colors for each vertex
geometry.faces.push(new THREE.Face3(3, 2, 0, normal, colors, 0));
geometry.computeVertexNormals();
geometry.computeFaceNormals();

console.log(geometry);

var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);

renderer.render(scene, camera);
