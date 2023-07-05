//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Buffer Geometry from v3Array
const Vector3ArrayToGeometry = (v3Array) => {
    return new THREE.BufferGeometry().setFromPoints(v3Array);
};
// Vector3 array from geometry
const Vector3ArrayFromGeometry = (geometry) => {
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count,
    v3Array = [];
    while (i < len) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v3Array.push(v);
        i += 1;
    }
    return v3Array;
};
//-------- ----------
// POINTS
//-------- ----------
// Geometry created with the Torus Geometry Constructor
const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
geometry.rotateX(Math.PI / 180 * 90);
// array of Vector3 class instances
const v3Array = Vector3ArrayFromGeometry(geometry);
// do somehting to the v3 array
v3Array.forEach((v) => {
    const vd = new THREE.Vector3();
    vd.copy(v).normalize().multiplyScalar(0.75 * THREE.MathUtils.seededRandom())
    v.add(vd);
});
// THREE.Points INSTANCE UISNG THREE.PointsMaterial
scene.add(
    new THREE.Points(
        Vector3ArrayToGeometry(v3Array),
        new THREE.PointsMaterial({
            color: 0x00afaf,
            size: 0.125
        })));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
