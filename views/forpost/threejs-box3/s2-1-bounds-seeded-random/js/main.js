//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(-2, 0.5, 4);
camera.lookAt(0, -0.25, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// set axis helper
const setAxis = function(mesh, box3, axis, per){
    // get mesh size
    const meshSize = new THREE.Vector3();
    mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox.getSize(meshSize);
    // get box size
    const boxSize = new THREE.Vector3();
    box3.getSize(boxSize);
    mesh.position[axis] = box3.min[axis] + meshSize[axis] / 2  + ( boxSize[axis] - meshSize[axis] ) * per;
};
// rnd
const rnd = function(){
    return THREE.MathUtils.seededRandom();
};
//-------- ----------
// BOX3
//-------- ----------
// create a new box3 with helper
const min = new THREE.Vector3(-1.0, -1.0, -1.0);
const max = new THREE.Vector3(1.0, 1.0, 1.0);
const box3 = new THREE.Box3(min, max);
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// MESH OBJECTS
//-------- ----------
// CREATE AND POSITION MESH OBJECTS IN THE BOX
let i = 0; 
const len = 80;
while(i < len){
    const w = 0.5 + 0.75 * rnd(),
    h = 0.5 + 0.75 * rnd(),
    d = 0.5 + 0.75 * rnd();
    const mesh = new THREE.Mesh( 
        new THREE.BoxGeometry(w, h, d), 
        new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.25
        }) 
    );
    setAxis(mesh, box3, 'x', rnd());
    setAxis(mesh, box3, 'y', rnd());
    setAxis(mesh, box3, 'z', rnd());
    scene.add(mesh);
    i += 1;
};
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);