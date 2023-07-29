//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0x2a2a2a,
    emissiveIntensity: 0.15,
    specular: 0x8f8f8f,
    shininess: 12
});
//-------- ----------
// LIGHT SOURCE
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 4, -2).normalize();
scene.add(dl);
//-------- ----------
// GEOMETRY / MESH
//-------- ----------
const geo = new THREE.SphereGeometry(1, 60, 60);
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
