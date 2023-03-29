//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// V3ARRAY
//-------- ----------
// creating an array of Vector3 instances
// using clone, LERP, and add methods
const points = [];
const v1 = new THREE.Vector3(5, 0, 5),
v2 = new THREE.Vector3(-5, 0, -5);
let i = 0, len = 100;
while (i < len) {
    const per = i / (len - 1),
    e1 = new THREE.Euler();
    e1.x = Math.PI * 8 * per;
    e1.z = Math.PI * 8 * per;
    // vector3
    const v3 = new THREE.Vector3();
    v3.y = Math.pow(2, 2 * per)
        points.push(v1.clone().lerp(v2, per).applyEuler(e1).add(v3));
    i += 1;
}
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
// geometry from points array
const geometry = new THREE.BufferGeometry().setFromPoints(points);
// line object
const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: 0x0000ff,
            linewidth: 6
        }));
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
