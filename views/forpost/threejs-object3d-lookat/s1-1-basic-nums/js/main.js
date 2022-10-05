//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECT
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 20, 20),
    new THREE.MeshNormalMaterial());
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
// setting position of camera and mesh
camera.position.set(5, 5, 5);
mesh.position.set(2, 0, -3);
// USING LOOKAT TO HAVE BOTH MESH AND CAMERA LOOK AT 0,0,0
camera.lookAt(0, 0, 0);
mesh.lookAt(0, 0, 0);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
