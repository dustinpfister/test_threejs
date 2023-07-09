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
// GROUP
//-------- ----------
const group = new THREE.Group();
scene.add(group);
const mainBox = createBox(1, 1, 1);
group.add(mainBox);
// Mesh cloned a bunch of times from original
let i = 0;
while (i < 10) {
    const s = 0.25 + 0.25 * ( Math.random() * 5 );
    const mesh = createBox(s, s, s);
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(mainBox.position);
    group.add(mesh);
    i += 1;
}
// changing the color of the main box ONLY EFFECTS THE MAIN BOX
mainBox.material.color.setRGB(0, 1, 0);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
