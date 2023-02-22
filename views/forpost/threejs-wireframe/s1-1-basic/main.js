//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH, GEOMETRY, MATREIAL - in wireframe mode
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.50, 1.50, 1.50),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    })
);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.25, 2);
camera.lookAt(0, -0.2, 0);
renderer.render(scene, camera);

