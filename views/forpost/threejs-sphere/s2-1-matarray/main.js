// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// THE SPHERE
// ---------- ----------
const materials = [
    new THREE.MeshPhongMaterial({
        color: 0x880000,
        emissive: 0x181818
    }),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0x1f1f1f
    }),
    new THREE.MeshPhongMaterial({
        color: 0x008800,
        emissive: 0x181818
    }),
    new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x1f1f1f
    })
];
const geometry = new THREE.SphereGeometry(0.5, 15, 15);
const position = geometry.getAttribute('position');
// looking at the state of things here
let len = 1259, mi = 0, i =0;
console.log(len)
console.log(geometry);
console.log(position);
while (i < len) {
    mi = i / 3 % 4;
    geometry.addGroup(i, 3, mi);
    i += 3;
}
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh = new THREE.Mesh(
        geometry,
        materials
    );
mesh.position.set(0, 0, 0);
scene.add(mesh);
const light = new THREE.PointLight(0xffffff, 1.5); 
light.position.set(1, 1, 0);
camera.add(light);
scene.add(new THREE.GridHelper(10, 10));
scene.add(camera);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(0.75, 0.50, 0.75);
camera.lookAt(0, 0, 0);
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
