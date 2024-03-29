//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(8, 8, 0xffffff, 0x000000));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FOG AND BACKGROUND
//-------- ----------
// ADDING BACKGROUND AND FOG
const fogColor = new THREE.Color(0xffffff);
scene.background = fogColor; // Setting fogColor as the background color also
scene.fog = new THREE.Fog(fogColor, 0.25, 4);
//-------- ----------
// MESH
//-------- ----------
// Use a Material that SUPPORTS FOG such as the basic material
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
