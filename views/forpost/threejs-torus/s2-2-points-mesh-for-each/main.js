//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0.25, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(al);
//-------- ----------
// CREATING MESH OBEJCTS FOR EACH POINT IN TORUS GEOMERTY
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 15,
tubeSegments = 60;
const sourceGeo = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments);
const pos = sourceGeo.getAttribute('position');
let i = 0, len = pos.count;
while(i < len){
    const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.025, 10, 10), new THREE.MeshPhongMaterial() )
    mesh.position.copy(v);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
