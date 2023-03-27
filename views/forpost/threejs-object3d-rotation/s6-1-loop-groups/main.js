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
// MESH OBJECTS
// ---------- ----------
const mkCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
};
const theCubes = new THREE.Group();
scene.add(theCubes);
[-45, 0, 45, 20].forEach(function(d, i, arr){
    const cube = mkCube(),
    p = i / (arr.length - 1 );
    cube.position.set(-3 + 6 * p, 0, 0);
    cube.rotation.y = THREE.MathUtils.degToRad(d);
    theCubes.add(cube);
});
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0,0,0);
// APP LOOP
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frame = 0,
frameMax = 600,
lt = new Date();
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    // rotating the group of cubes
    theCubes.rotation.y = Math.PI * 2 * per;
    // rotation of each child
    theCubes.children.forEach(function(cube, i){
        cube.rotation.x = Math.PI * 2 * ( 1 + i * 2) * per;
    });
};
// loop
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        update();
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
