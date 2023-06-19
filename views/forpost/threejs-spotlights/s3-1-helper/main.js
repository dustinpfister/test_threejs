// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
// ---------- ----------
// SPOTLIGHT WITH HELPER
// ---------- ----------
const spotLight = new THREE.SpotLight(new THREE.Color('white'), 0.5, 10, 0.5, 1);
spotLight.position.set(3, 3, 0);
spotLight.add(new THREE.SpotLightHelper(spotLight))
scene.add(spotLight);
// MESH OBJECTS
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
cube.position.set(0, 1, 0);
scene.add(cube);
const mesh_floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshStandardMaterial({
            color: 0x008800
        }));
scene.add(mesh_floor);
// RENDER
camera.position.set(5, 8, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
