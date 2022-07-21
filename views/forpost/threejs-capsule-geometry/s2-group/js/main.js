//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// GROUP OF MESH OBJECTS
//******** **********
// array of vector values
var vectors = [
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
];
// turn vectors array into an array of vector3 instances
vectors = vectors.map(function(a){
    return new THREE.Vector3( a[0], a[1], a[2] );
});
// create a group and add that to the scene
var group = new THREE.Group();
scene.add( group );
// make mesh objects and add them to the group
var i = 0,
len = vectors.length;
while(i < len - 1){
    var v = vectors[i],
    nv = vectors[i + 1],
    d = v.distanceTo(nv); // distance from current vector to next vector
    var mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, d, 20, 20),
        new THREE.MeshNormalMaterial());
    // position should be a mid point between v and nv
    var mv = v.add(nv).divideScalar(2);
    mesh.position.copy(mv);
    // adjust geo to work well with lookAt
    mesh.geometry.rotateX(Math.PI * 0.5)
    mesh.lookAt(nv)
    // add to group
    group.add(mesh);
    i += 1;
}
//******** **********
// RENDER THE SCENE
//******** **********
renderer.render(scene, camera);