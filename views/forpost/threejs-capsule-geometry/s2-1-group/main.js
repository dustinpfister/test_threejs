//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GROUP OF MESH OBJECTS
//-------- ----------
const vectors = [
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
].map(function(a){
    return new THREE.Vector3( a[0], a[1], a[2] );
});
// create a group and add that to the scene
const group = new THREE.Group();
scene.add( group );
// make mesh objects and add them to the group
let i = 0;
const thickness = 0.75,
len = vectors.length;
while(i < len - 1){
    const v = vectors[i],
    nv = vectors[i + 1],
    d = v.distanceTo(nv); // distance from current vector to next vector
    const mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(thickness, d, 10, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
    // position should be a mid point between v and nv
    const mv = v.add(nv).divideScalar(2);
    mesh.position.copy(mv);
    // adjust geo to work well with lookAt
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.lookAt(nv)
    // add to group
    group.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER THE SCENE
//-------- ----------
camera.position.set(-10, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
