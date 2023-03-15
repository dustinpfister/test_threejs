//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
// USING THE RANDFLOAT and euclideanModulo METHODs
let i = 0;
const len = 30;
while(i < len){
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    let x = THREE.MathUtils.randFloat(-7, 7);
    x = -4.5 + THREE.MathUtils.euclideanModulo(x, 9);
    let z = THREE.MathUtils.randFloat(-100, 100);
    z = -4.5 + THREE.MathUtils.euclideanModulo(z, 9);
    mesh.position.set(x, 0, z)
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
