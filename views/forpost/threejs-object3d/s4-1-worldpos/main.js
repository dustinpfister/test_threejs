//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECT WITH CHILD OBJECTS
//-------- ----------
const geo = new THREE.SphereGeometry(1, 30, 30);
const mat = new THREE.MeshNormalMaterial();
const mesh_parent = new THREE.Mesh(geo, mat);
const mesh_child = new THREE.Mesh(geo, mat);
mesh_parent.add(mesh_child);
scene.add(mesh_parent);
// setting position values for parent and child objects
mesh_parent.position.set(-8,0,2);
mesh_child.position.set(8,0,-4);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
const v1 = mesh_child.position.clone();
const v2 = mesh_child.getWorldPosition( new THREE.Vector3() );
let f = 0;
const fm = 90;
const loop = () => {
    requestAnimationFrame(loop);
    const a1 = f / fm;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.lookAt( v2.clone().lerp(v1, a2) );
    renderer.render(scene, camera);
    f += 1;
    f %= fm;
};
loop();