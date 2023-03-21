// CREATE A SCENE
const scene = new THREE.Scene();
const fogColor = new THREE.Color(0xffffff);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
// add a CAMERA to it so we can see something
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 1, 2); // position the camera away from the mesh
camera.lookAt(0, 0, 0); // look at 0,0,0
// we need a RENDERER to render the scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// add a Mesh to look at with the Standard Material
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshStandardMaterial( { emissive: 0xff0000 } ));
scene.add(mesh);
// render the scene with the camera
renderer.render(scene, camera);
