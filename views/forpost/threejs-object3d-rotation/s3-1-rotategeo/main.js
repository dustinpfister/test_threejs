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
const mkCone = function(){
    const cone = new THREE.Mesh(
       new THREE.ConeGeometry(0.125, 0.66, 30, 30),
       new THREE.MeshNormalMaterial());
    // Rotating the geometry of each cone once
    cone.geometry.rotateX(1.57);
    return cone;
};
// get position helper
const getPos = function(i, len){
    const p = i / (len - 1 ),
    x = -8 + 15 * p,
    y = -1.5 + 3 * p,
    z = -8 + Math.sin(Math.PI * p) * 12;
    return new THREE.Vector3(x, y, z);
};
// creating and positioning mesh objects
const theCones = new THREE.Group();
scene.add(theCones);
let i = 0, len = 20;
while(i < len){
    const cone = mkCone();
    //cone.position.set(x, y, z);
    cone.position.copy(getPos(i , len))
    theCones.add(cone);
    i += 1;
}
// using look at for each cube to set rotation of each cube
theCones.children.forEach(function(cone, i, arr){
    let i2 = i + 1, 
    cone2, vec;
    if(i === 0){
        i2 = 1;
    }
    if(i >= arr.length - 1){
        vec = getPos(len, len);
    }else{
        vec = arr[i2].position;
    }
    cone.lookAt(vec);
});
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2, 4, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
