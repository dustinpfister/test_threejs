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
// HELPERS
//******** **********

// create and return a new group of mesh objects using the capsule geometry
// using a aray of vector3 class instances
var createCapsuleLine = function(vectors, material){
    // defaults for arguments
    vectors = vectors || [];
    material = material || new THREE.MeshNormalMaterial({})
    // create a group and add that to the scene
    var group = new THREE.Group();
    // make mesh objects and add them to the group
    var i = 0,
    thickness = 0.25,
    capsuleGeo = new THREE.CapsuleGeometry(1.0, 0.125, 20, 20),
    len = vectors.length;
    while(i < len - 1){
        var v = vectors[i] || new THREE.Vector(),
        nv = vectors[i + 1] || new THREE.Vector(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        var mesh = new THREE.Mesh(
            capsuleGeo,
            material);
        mesh.scale.set(thickness, thickness, d / 2.0);
        // position should be a mid point between v and nv
        var mv = v.add(nv).divideScalar(2);
        mesh.position.copy(mv);
        // adjust geo to work well with lookAt
        mesh.geometry.rotateX(Math.PI * 0.5);
        mesh.lookAt(nv)
        // add to group
        group.add(mesh);
        i += 1;
    }
    return group;
};
// array of array of axis values to array of Vector3 class instances
var vectorArrayToVector3Array = function(vectorArray){
    return vectorArray.map(function(a){
        return new THREE.Vector3( a[0], a[1], a[2] );
    });
};
//******** **********
// Capsule Group one
//******** **********
// array of vector values
var vectors = vectorArrayToVector3Array([
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
]);
var g1 = createCapsuleLine(vectors);
scene.add( g1 );
//******** **********
// RENDER THE SCENE
//******** **********
renderer.render(scene, camera);