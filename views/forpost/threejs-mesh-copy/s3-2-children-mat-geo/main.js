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
// create a single box
const createBox = function(w, h, d){
    return new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        })
    );
};
// create a box parent
const createBoxParent = () => {
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
    return mesh_main;
};
// copy a box parent
const copyBoxParent = (mesh_main) => {
    // clone of mesh_main
    const mesh_main_2 = mesh_main.clone();
    mesh_main_2.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            obj.material = obj.material.clone();
            obj.geometry = obj.geometry.clone();
        }
    });
    return mesh_main_2;
};
//-------- ----------
// MESH and CHILDREN OF MESH
//-------- ----------
const mesh_main = createBoxParent();
const mesh_main_2 = copyBoxParent(mesh_main);
mesh_main_2.position.set(-5, 0, -5);
scene.add(mesh_main_2);
// now I can update not just object3d probs but so thing with
// the material and geometry without effecting source object
const mesh = mesh_main_2.children[5];
mesh.position.y = 2;
mesh.material.color.setRGB(0,1,0);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
