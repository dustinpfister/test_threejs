//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo')|| document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff);
scene.add(al);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
