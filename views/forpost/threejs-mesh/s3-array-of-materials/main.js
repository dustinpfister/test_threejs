// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// the materials array
const materials = [
    // material 0 (red basic)
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    }),
    // material 1 (green basic)
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    }),
    // material 2 (blue basic)
    new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide
    })
];
// a box geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
// for all faces
geometry.groups.forEach(function (face, i) {
    face.materialIndex = i % materials.length;
});
// add to scene with the Mesh
scene.add(new THREE.Mesh(
    geometry,
    materials));
// RENDER
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
