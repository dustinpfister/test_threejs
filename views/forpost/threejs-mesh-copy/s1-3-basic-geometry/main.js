//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 4, 2);
scene.add(sun);
//-------- ----------
// MESH original
//-------- ----------
const original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        // Now using an array of materials
        [
            new THREE.MeshStandardMaterial({
                color: 'red'
            }),
            new THREE.MeshStandardMaterial({
                color: 'lime'
            }),
            new THREE.MeshStandardMaterial({
                color: 'blue'
            })
        ]);
scene.add(original);
//-------- ----------
// Mesh cloned a bunch of times from original
//-------- ----------
let i = 0;
while (i < 10) {
    const mesh = original.clone();
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// GEOMETRY CHNAGE
//-------- ----------
// a change to the original geometry will effect all the clones
original.geometry.groups.forEach(function (face, i) {
    face.materialIndex = i % original.material.length;
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 6, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
