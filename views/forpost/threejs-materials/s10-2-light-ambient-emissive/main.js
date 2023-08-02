//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(al);
//-------- ----------
// MATERAILS
//-------- ----------
const material_1 = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
const material_2 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x00ff00,
    emissiveIntensity: 1
});
//-------- ----------
// GRID AND MESH
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const geo = new THREE.BoxGeometry(1, 1, 1);
const mesh_1 = new THREE.Mesh( geo, material_1 );
mesh_1.position.x = -0.7;
scene.add( mesh_1 );
const mesh_2 = new THREE.Mesh( geo, material_2 );
mesh_2.position.x = 0.7;
scene.add( mesh_2 );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

