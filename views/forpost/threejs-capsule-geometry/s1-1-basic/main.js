//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATEING A MESH WITH A CapsuleGeometry as The GEOMETRY
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 2, 20, 20),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// RENDER THE SCENE
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);