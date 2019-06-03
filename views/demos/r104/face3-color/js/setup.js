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
    new THREE.Vector3(1, 1, 0)
];
geometry.faces.push(new THREE.Face3(0, 1, 2, new THREE.Vector3(0, 0, 1), new THREE.Color(0xffaa00), 0));
geometry.computeVertexNormals();
geometry.computeFaceNormals();

var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        }));
scene.add(mesh);

renderer.render(scene, camera);
