//-------- ----------
// create a Scene
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OVERRIDE MATERIAL
//-------- ---------- 
// can set an override material for everything
scene.overrideMaterial = new THREE.MeshDepthMaterial();
//-------- ----------
// OBJECTS
//-------- ---------- 
// just adding a 1x1x1 cube with the default
// MeshBasicMaterial and random color for faces
// when added to the scene like this
scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
// adding another 1x1x1 cube but this time I am giving
// and instance of MeshBasicMaterial in which I am setting
// the face color of the faces to red
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    }));
cube2.position.set(-2, 0, 0);
scene.add(cube2);
// a sphere using the lamber material in wire frame mode
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 20, 20),
    new THREE.MeshLambertMaterial({
        emissive: 0x00004a
}));
sphere.position.set(0, 0, -2);
scene.add(sphere);
//-------- ----------
// RENDER
//-------- ---------- 
// render the scene with the camera
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
