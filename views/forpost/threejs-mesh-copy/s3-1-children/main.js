//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
//-------- ----------
// HELPERS
//-------- ----------
const createBox = function(w, h, d){
    return new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        })
    );
};
//-------- ----------
// MESH and CHILDREN OF MESH
//-------- ----------
// mesh
const mesh_main = createBox(1, 1, 1);
scene.add(mesh_main);
// adding children
let i = 0, len = 10;
while (i < len) {
    const mesh = createBox(1, 1, 1);
    const rad = Math.PI * 2 * (i / len);
    mesh.position.set(Math.cos(rad) * 2.5, 0, Math.sin(rad) * 2.5);
    mesh.lookAt(mesh_main.position);
    mesh_main.add(mesh);
    i += 1;
}
// clone of mesh_main
const mesh_main_2 = mesh_main.clone();
mesh_main_2.position.set(-5, 0, -5);
scene.add(mesh_main_2);
// clone of mesh_main
const mesh_main_3 = mesh_main.clone();
mesh_main_3.position.set(5, 0, -5);
scene.add(mesh_main_3);
// updating object3d props of the children of one clone will not effect another
const mesh = mesh_main_2.children[5];
mesh.position.y = 2;
// however doing somehting to the material or geometry will effect
// all coresponding children
mesh.material.color.setRGB(0,1,0);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
