//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a single cone and rotate the geo once
const createConeMesh = () => {
    const geo = new THREE.ConeGeometry(0.5, 1, 10, 10);
    geo.rotateX(Math.PI * 0.5);
    const cone = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
    return cone;
};
// create a cone circle
const createConeCircle = function (radius, count) {
    const group = new THREE.Group();
    let i = 0;
    while (i < count) {
        // creating a mesh
        const cone = createConeMesh();
        // position the mesh
        const vs = new THREE.Vector3(0, 0, 1);
        const e = new THREE.Euler(0, Math.PI / 180 * 360 * (i / count), 0 );
        cone.position.copy(vs).applyEuler(e).multiplyScalar( radius );
        // set look at point
        cone.lookAt(0, 0, 0);
        // add mesh to the group
        group.add(cone);
        i += 1;
    }
    return group;
};
//-------- ----------
// GROUPS
//-------- ----------
// add groups
const group1 = createConeCircle(2, 8);
scene.add(group1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
