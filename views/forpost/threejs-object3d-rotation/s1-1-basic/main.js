// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const mkCube = function(){
    return new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
};
// ---------- ----------
// OBJECTS
// ---------- ----------
[-45, 0, 45, 20].forEach(function(d, i, arr){
    const cube = mkCube(),
    p = i / (arr.length - 1 );
    cube.position.set(-3 + 6 * p, 0, 0);
    cube.rotation.y = THREE.MathUtils.degToRad(d);
    scene.add(cube);
});
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
