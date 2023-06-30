//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.SphereGeometry(1, 20, 20), new THREE.MeshNormalMaterial() );
mesh.userData.heading = new THREE.Vector3(0, 1, 0);
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date();
const fps = 24;
const update = (secs) => {
    const v_delta = mesh.userData.heading.clone().normalize().multiplyScalar( 1 / 0.25 * secs );
    mesh.position.add( v_delta );
    if(mesh.position.length() >= 5){
        mesh.position.set(0,0,0);
        mesh.userData.heading.random().sub( new THREE.Vector3(0.5, 0.5, 0.5) );
    }
};
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
