//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
const mesh_source = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 20, 20),
    new THREE.MeshNormalMaterial({
        transparent: true, opacity: 0.4
    })
);
mesh_source.position.set(-1,0.25,2);
scene.add( mesh_source );
let i = 0;
const len = 10;
while(i < len){
    const a_len = i / len;
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.MeshNormalMaterial()
    );
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a_len;
    e.z = Math.PI / 180 * 180 * a_len;
    const v = mesh_source.position.clone().normalize().applyEuler(e).add( mesh_source.position );
    mesh.position.copy( v );
    mesh.lookAt( mesh_source.position );
    scene.add( mesh );
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.25, 0.5, 0);
camera.lookAt( mesh_source.position.clone().add( new THREE.Vector3(0,-0.25,0) ) );
renderer.render(scene, camera);
