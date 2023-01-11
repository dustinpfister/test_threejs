//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(6.5, 6.5, 8.5);
camera.lookAt(-0.5, -3.0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SPOTLIGHT, AMBIENT LIGHT
//-------- ----------
const color = new THREE.Color('white'),
intensity = 1,
distance = 30,
angle = Math.PI * 0.05,
penumbra = 0.25,
decay = 0.5;
const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
spotLight.position.set(8, 8, 0);
scene.add(spotLight);
scene.add( new THREE.AmbientLight(0xffffff, 0.07));
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh_cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
mesh_cube.position.set(0, 1, 0);
scene.add(mesh_cube);
const mesh_floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshStandardMaterial({
            color: 0x008800
        }));
scene.add(mesh_floor);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
