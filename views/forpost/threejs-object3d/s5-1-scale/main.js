//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
const geo = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshNormalMaterial();
// source mesh object
const mesh_source = new THREE.Mesh(geo, mat);
// mesh objects cloned from source mesh objects and scaled
const count = 8;
let i = 0;
while(i < count){
    const a1 = i / (count - 1);
    const mesh = mesh_source.clone();
    mesh.scale.set(1, i + 1 ,1);
    mesh.position.x = -5 + 10 * a1;
    mesh.position.y = 0.5 + 0.5 * i;
    scene.add(mesh)
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 2, 0);
renderer.render(scene, camera);
