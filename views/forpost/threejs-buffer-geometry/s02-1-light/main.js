// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
const materials = [
    new THREE.MeshStandardMaterial({
        color: 'red',
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
        color: 'lime',
        side: THREE.DoubleSide
    })
];
// GEOMETRY
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0, // triangle 1
    1, 0, 0,
    1, 1, 0,
    0, 0, 0, // triangle 2
    0, 1, 0,
    1, 1, 0
]);
// create position property
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// compute vertex normals
geometry.computeVertexNormals();
// add groups, and set material index values
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);
// MESH with GEOMETRY, and Normal MATERIAL
const custom = new THREE.Mesh( geometry, materials);
scene.add(custom);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materials);
box.position.set(-1, 0, 0);
box.geometry.groups.forEach(function (face, i) {
    face.materialIndex = i % materials.length;
});
scene.add(box);
// ADD A POINT LIGHT
const pl = new THREE.PointLight(0xffffff);
pl.position.set(4, 2, 4);
scene.add(pl);
// add AmbientLight
const al = new THREE.AmbientLight(0xffffff);
al.intensity = 0.2;
scene.add(al);
 
// LOOP
camera.position.set(1, 2, 4);
camera.lookAt(0, 0, 0);
let frame = 0, lt = new Date();
const maxFrame = 200,
fps_target = 24;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / fps_target) {
        const per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        r = -Math.PI * 2 * per;
        custom.rotation.set(0, Math.PI * 2 * per, 0);
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
