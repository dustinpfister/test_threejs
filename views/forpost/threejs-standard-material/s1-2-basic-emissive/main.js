//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1,1,1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 3, -5);
scene.add(dl);
//-------- ----------
// CREATING A MESH WITH THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1, 0, 0),
    emissive: new THREE.Color(1, 1, 1), // WHITE emissive COLOR
    emissiveIntensity: 0.25             // Intensity of emissive COLOR
});
scene.add( new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 80, 80),
    material) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
