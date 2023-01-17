//-------- ----------
// SCENE, CAMERA, RENDER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const setNormal = function (geometry, normalIndex, pos) {
    const normal = geometry.getAttribute('normal');
    normal.array[normalIndex * 3] = pos.x;
    normal.array[normalIndex * 3 + 1] = pos.y;
    normal.array[normalIndex * 3 + 2] = pos.z;
    normal.needsUpdate = true;
};
// set a given arrow helper to the given normal index
const setArrowHelperToNormal = function (geometry, arrowHelper, normalIndex) {
    // check out the normal attribute of a cube
    const normal = geometry.getAttribute('normal');
    const position = geometry.getAttribute('position');
    const values1 = normal.array.slice(normalIndex * 3, normalIndex * 3 + 3);
    const dir = new THREE.Vector3(values1[0], values1[1], values1[2]);
    const values2 = position.array.slice(normalIndex * 3, normalIndex * 3 + 3);
    const origin = new THREE.Vector3(values2[0], values2[1], values2[2]);
    arrowHelper.setDirection(dir);
    arrowHelper.position.copy(origin);
    arrowHelper.setColor(0x00ff00);
};
//-------- ----------
// GEOMETRY, MATERIAL, MESH, HELPERS
//-------- ----------
// GEOMETRY - starting with a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// use the geometry with a mesh
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.FrontSide //THREE.DoubleSide
}));
scene.add(mesh);
const helper1 = new THREE.ArrowHelper();
const helper2 = new THREE.ArrowHelper();
const helper3 = new THREE.ArrowHelper();
scene.add(helper1);
scene.add(helper2);
scene.add(helper3);
//-------- ----------
// LOOP
//-------- ----------
camera.lookAt(mesh.position);
const pos = {
    x: -1,
    y: -1,
    z: 0
};
let radian = 0,
dps = 22.5,
lt = new Date();
// update
const update = function () {
    setNormal(geometry, 0, pos);
    setNormal(geometry, 1, pos);
    setNormal(geometry, 2, pos);
    setArrowHelperToNormal(geometry, helper1, 0);
    setArrowHelperToNormal(geometry, helper2, 1);
    setArrowHelperToNormal(geometry, helper3, 2);
};
// loop
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / 30) {
        radian += Math.PI * 2 / 180 * dps * secs;
        pos.y = Math.sin(radian);
        pos.x = Math.cos(radian);
        update();
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
