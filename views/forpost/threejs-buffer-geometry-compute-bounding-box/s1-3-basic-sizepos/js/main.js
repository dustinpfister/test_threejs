//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const positionMesh = (mesh, x, z) => {
    const geo = mesh.geometry;
    // COMPUTE THE BOUNDING BOX AND GET bb REF TO IT
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    // GET SIZE, and use size to position MESH
    const v_size = new THREE.Vector3();
    bb.getSize(v_size);
    mesh.position.set(x, v_size.y / 2, z);
    return mesh;
};
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const m = new THREE.MeshNormalMaterial();
scene.add( positionMesh(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 3.25, 3), m),
        -4.5, -3.5));
scene.add( positionMesh(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 5, 1), m),
        3.5, 1.5));
scene.add( positionMesh(
    new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2), m),
        -3.0, 3.0));
//-------- ----------
//  RENDER
//-------- ----------
renderer.render(scene, camera);