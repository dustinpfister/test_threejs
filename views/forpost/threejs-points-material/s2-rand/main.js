//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// POINTS
//-------- ----------
// geometry
let i = 0;
const verts = [];
while (i < 500) {
    const pt = new THREE.Vector3();
    pt.set(
        THREE.MathUtils.randFloatSpread(45),
        THREE.MathUtils.randFloatSpread(45),
        THREE.MathUtils.randFloatSpread(45));
    verts.push(pt.x, pt.y, pt.z);
    i += 1;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
// THREE.Points INSTANCE UISNG THREE.PointsMaterial
scene.add(
    new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            color: 0x00afaf
        })));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
