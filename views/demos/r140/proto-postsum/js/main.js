//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, -0.2, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo = new THREE.PlaneGeometry(5, 5, 4, 4);
geo.rotateX(Math.PI * 1.5);

const pos = geo.getAttribute('position');
// sum data can be used to mutate y values of a plane geometry
[
    2.00, 0.50, 0.25, 1.25, 1.8,
    0.50, 0.25, 1.25, 0.25, 0.1,
    0, 0.50, 0.25, 1.25, 0.1,
    0, 0.50, 0.25, 1.25, 0.1,
    0, 1.75, 0.25, 1.25, 0.1
].forEach((y, i) => {
    pos.setY(i, y);
});
pos.needsUpdate = true;

geo.computeVertexNormals();

//-------- ----------
// MESH, MATERIAL
//-------- ----------
//main mesh object using geo_box
const mesh = new THREE.Mesh( geo, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: true} ) );
scene.add(mesh);
//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);