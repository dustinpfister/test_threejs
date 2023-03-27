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
// creating and positioning mesh objects
const theCubes = new THREE.Group();
scene.add(theCubes);
let i = 0, len = 7;
while(i < len){
    const cube = mkCube(),
    p = i / (len - 1 );
    //position of each cube
    const x = -3 + 6 * p,
    y = -1.5 + 3 * p,
    z = -4 + Math.sin(Math.PI * p) * 6;
    cube.position.set(x, y, z);
    theCubes.add(cube);
    i += 1;
}
// using look at for each cube to set rotation of each cube
theCubes.children.forEach(function(cube, i, arr){
    let i2 = i + 1, cube2;
    if(i === 0){
        i2 = 1;
    }
    if(i >= arr.length - 1){
        i2 = arr.length - 2;
    }
    cube2 = arr[i2];
    cube.lookAt(cube2.position);
});
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2, 4, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
