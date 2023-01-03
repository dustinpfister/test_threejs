//-------- ---------
// SCENE, CAMERA, RENDERER
//-------- ---------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(0, 0, -30);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(649, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ---------
// CREATE THE LINE
//-------- ---------
const points = [];
points.push(
    new THREE.Vector3(-10, -10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(-10, 10, 0));
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
);
scene.add(line);
//-------- ---------
// RENDERER
//-------- ---------
renderer.render(scene, camera);
