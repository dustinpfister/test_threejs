// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
//-------- ----------
// camera group
//-------- ----------
const group_camera = cameraPlanes.create({camera: camera});
scene.add(group_camera);
// ---------- ----------
// RENDER
// ---------- ----------
// it is then the group that I would want to move and rotate rather than the camera
group_camera.position.set(5,1,-3);
group_camera.rotation.y = Math.PI / 180 * 45;
renderer.render(scene, group_camera.userData.camera);
