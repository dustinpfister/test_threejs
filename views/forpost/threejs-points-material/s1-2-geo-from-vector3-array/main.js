
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
// ARRAY of VECTOR3 CLASS INSTANCES
const v3Array = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(0, 0, 2),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(0, 0, 3)
];
// THREE.Points INSTANCE UISNG THREE.PointsMaterial
scene.add(
    new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(v3Array),
        new THREE.PointsMaterial({
            color: 0x00afaf,
            size: 0.25
        })));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
