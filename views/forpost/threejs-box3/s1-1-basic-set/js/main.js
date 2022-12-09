//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5))
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE A NEW BOX3
//-------- ----------
const box3 = new THREE.Box3(
    new THREE.Vector3(-2.5, -2.5, -2.5),
    new THREE.Vector3(2.5, 2.5, 2.5));
//-------- ----------
// MESH - position with box3 values
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.position.set(box3.min.x, 0, box3.min.z );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);