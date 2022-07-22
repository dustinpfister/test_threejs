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
// update a capsule line group with the given array of vector3 class instances
var updateCapsuleLine = function(group, vectors, thickness){
    // defaults for arguments
    vectors = vectors || [];
    thickness = thickness === undefined ? 0.25: thickness;
    var i = 0,
    len = vectors.length;
    while(i < len - 1){
        var v = vectors[i] || new THREE.Vector3(),
        nv = vectors[i + 1] || new THREE.Vector3(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        var mesh = group.children[i];
        // set scale
        mesh.scale.set(thickness, thickness, d / 2.0);
        // position should be a mid point between v and nv
        var mv = v.clone().add(nv).divideScalar(2);
        mesh.position.copy(mv);
        //  and set rotation
        mesh.lookAt(nv);
        i += 1;
    }

};
// create and return a new group of mesh objects using the capsule geometry
// using a aray of vector3 class instances
var createCapsuleLine = function(vectors, material, capsuleGeo){
    // defaults for arguments
    vectors = vectors || [];
    material = material || new THREE.MeshNormalMaterial({});
    capsuleGeo = capsuleGeo || new THREE.CapsuleGeometry(0.25, 1.5, 20, 20);
    // create a group and add that to the scene
    var group = new THREE.Group();
    // make mesh objects and add them to the group
    var i = 0,
    len = vectors.length;
    while(i < len - 1){
        var v = vectors[i] || new THREE.Vector3(),
        nv = vectors[i + 1] || new THREE.Vector3(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        var mesh = new THREE.Mesh(
            capsuleGeo,
            material);
        // adjust geo to work well with lookAt
        mesh.geometry.rotateX(Math.PI * 0.5);
        group.add(mesh);
        i += 1;
    }
    // update for first time
    updateCapsuleLine(group, vectors, 1);
    // return the group
    return group;
};
// array of array of axis values to array of Vector3 class instances
// if it is all ready an array of vector3S then return clones
var vectorArrayToVector3Array = function(vectorArray){
    return vectorArray.map(function(a){
        if(a instanceof Array){
            return new THREE.Vector3( a[0], a[1], a[2] );
        }
        // assume that it is all ready a Vector3 and return a clone
        return a.clone();
    });
};
//******** **********
// Capsule Group one
//******** **********
// array of vector values
var vectors1 = vectorArrayToVector3Array([
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
]);
var vectors2 = vectorArrayToVector3Array([
    [0, 0, 0 ],
    [ 0, 5, 5 ],
    [ 0, 5, 0 ],
    [ 0, -1, -4 ],
    [ -4, -1, -4 ],
    [ -4, -5, -4 ],
    [ -4, -5, 5 ],
    [ 5, -5, 5 ]
]);
var vectors = vectorArrayToVector3Array(vectors1);
var g1 = createCapsuleLine(vectors);
scene.add( g1 );
//******** **********
// RENDER THE SCENE
//******** **********
//******** **********
// LOOP
//******** **********
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        //var v = vectors[0];
        //v.x = -20 * bias;
        updateCapsuleLine(g1, vectors, 1);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();