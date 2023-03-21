//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const fogColor = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD FOG A SCENE
//-------- ----------
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
// add a Mesh to look at with the Standard Material
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshStandardMaterial( { emissive: 0xff0000 } ));
scene.add(mesh);
// render the scene with the camera
camera.position.set(2, 1, 2); // position the camera away from the mesh
camera.lookAt(0, 0, 0); // look at 0,0,0
renderer.render(scene, camera);
