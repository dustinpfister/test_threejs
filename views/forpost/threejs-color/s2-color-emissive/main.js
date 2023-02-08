//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
var mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: new THREE.Color(1, 1, 1),
        emissiveIntensity: 0.8,
        emissive: new THREE.Color(1, 0, 0)
    })
);
scene.add(mesh1);
//-------- ----------
// LIGHT
//-------- ----------
var pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
