//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// CAMERA
//-------- ----------
const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.01, 1000);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
) 
scene.add( mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
let frame = 0;
const frameMax = 300;
const loop = () => {
    const a_frame = frame / frameMax;
    const a_cam = Math.sin( Math.PI * 2 * a_frame );
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    camera.position.x = -2 + 4 * a_cam;
    camera.lookAt( mesh.position );
    frame += 1;
    frame %= frameMax;
};
loop();