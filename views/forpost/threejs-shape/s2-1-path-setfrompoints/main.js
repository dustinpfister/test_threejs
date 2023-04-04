//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
// cretaing an array of THREE.Vector2 objects
const points = [];
const len = 100;
let i = 0;
while(i < len){
    const a = i / len;
    const x = -3  + 6 * a;
    const y = Math.sin( Math.PI * 1.0 * a ) * 4;
    points.push(new THREE.Vector2(x, y));
    i += 1;
}
const shape = new THREE.Shape();
// creating the path by using the set from points method
// with the array of THREE.Vector2 objects
shape.setFromPoints(points);
//-------- ----------
// GEOMETRY
//-------- ----------
const extrudeSettings = {
    depth: 1.5,
    bevelEnabled: false,
    steps: 2};
const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
//geometry.rotateX(Math.PI * 1);
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
renderer.render(scene, camera);
