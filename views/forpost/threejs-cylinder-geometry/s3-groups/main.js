//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(3, 4, 1);
scene.add(dl);
//-------- ----------
// OBJECTS
//-------- ----------
const materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000}),
    new THREE.MeshStandardMaterial({ color: 0x00ff00}),
    new THREE.MeshStandardMaterial({ color: 0x00ffff})
];
const mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
mesh2.position.set(0, 0, 1);
mesh2.rotation.z = Math.PI * 0.6;
scene.add(mesh2);
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
