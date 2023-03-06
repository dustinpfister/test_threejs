//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// add a light source
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
//-------- ----------
// MESH - original and clones
//-------- ----------
const original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
       // Now using the Standard material
        new THREE.MeshStandardMaterial({
            color: 'red'
        }));
scene.add(original);
let i = 0;
while (i < 10) {
    const mesh = original.clone();
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.name = 'clone' + i;
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// CHNAGE TO THE MATERIAL
//   * a change to one material will effect all because they all reference the same material
// * this can eb fixed by cloning the material as well for any mesh objects that should have there one material
//-------- ----------
// a change to the color of the original will effect all the clones also
original.material.color.setRGB(0, 1, 0);
// I can clone the material of one though and those changes to that will not effect all
const mesh_copy = scene.getObjectByName('clone3');
mesh_copy.material = mesh_copy.material.clone();
mesh_copy.material.color.setRGB(1, 0, 0)
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 6, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
