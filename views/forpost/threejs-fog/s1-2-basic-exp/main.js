//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(9, 9, 0xffffff, 0x000000));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FOG AND BACKGROUND
//-------- ----------
const fogColor = new THREE.Color(0xffffff);
scene.background = fogColor; 
scene.fog = new THREE.FogExp2(fogColor, 0.6);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0xffffff,
        emissiveIntensity: 0.25
    }));
scene.add(mesh);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 5, 3).normalize();
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
