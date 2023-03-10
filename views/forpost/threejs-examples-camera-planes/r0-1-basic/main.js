// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
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
const group_camera = cameraPlanes.create();
scene.add(group_camera);
// ---------- ----------
// RENDER
// ---------- ----------
// it is then the group that I would want to move and rotate rather than the camera
group_camera.position.set(0,1,-3);
group_camera.lookAt( 0, 0, 0 );
renderer.render(scene, group_camera.userData.camera);
