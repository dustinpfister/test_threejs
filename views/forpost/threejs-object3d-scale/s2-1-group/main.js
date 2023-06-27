// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPERS
// ---------- ---------- ----------
const createCubeGroup = function () {
    const size = 1,
    scale = 1 / 2,
    halfScale = scale / 2;
    const group = new THREE.Group();
    const box = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    group.add(box);
    let i = 0;
    const len = 4;
    while (i < len) {
        const copy1 = box.clone(),
        r = Math.PI * 2 / 4 * i,
        x = Math.cos(r) * 1,
        z = Math.sin(r) * 1;
        copy1.scale.set(scale, scale, scale);
        copy1.position.set(x, 0, z);
        group.add(copy1);
        i += 1;
    }
    return group;
};
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
// group1 with DEFAULT SCALE
const group1 = createCubeGroup();
group1.position.set(0, 0, 0);
scene.add(group1);
// group2 with 0.5 SCALE
const group2 = createCubeGroup();
group2.scale.set(0.5, 0.5, 0.5);
group2.position.set(3, 0, 3);
scene.add(group2);
// group3 with 2 SCALE
const group3 = createCubeGroup();
group3.scale.set(2, 2, 2);
group3.position.set(-3, 0, -3);
scene.add(group3);
// ---------- ---------- ----------
//  RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
