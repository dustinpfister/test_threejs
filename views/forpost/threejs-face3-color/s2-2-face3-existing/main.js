//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FACE3
//-------- ----------
// a box geometry
var box = new THREE.BoxGeometry(1, 1, 1);
// for each face3
box.faces.forEach(function (face3, i) {
    if (i % 2) {
        // vertex colors array
        face3.vertexColors = [
            new THREE.Color(0xff0000),
            new THREE.Color(0x00ff00),
            new THREE.Color(0x0000ff)];
    } else {
        // or just face color
        face3.color = new THREE.Color(0xffffff);
    }
});
//-------- ----------
// MESH
//-------- ----------
var mesh = new THREE.Mesh(box,
        new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
