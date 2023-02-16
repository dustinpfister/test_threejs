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
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-3, 6, 0).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.03))
//-------- ----------
// HELPERS
//-------- ----------
// update a capsule line group with the given array of vector3 class instances
const updateCapsuleLine = function(group, vectors, thickness){
    // defaults for arguments
    vectors = vectors || [];
    thickness = thickness === undefined ? 0.25: thickness;
    let i = 0;
    const len = vectors.length;
    while(i < len - 1){
        const v = vectors[i] || new THREE.Vector3(),
        nv = vectors[i + 1] || new THREE.Vector3(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        const mesh = group.children[i];
        // set scale
        mesh.scale.set(thickness, thickness, d / 2.0);
        // position should be a mid point between v and nv
        const mv = v.clone().add(nv).divideScalar(2);
        mesh.position.copy(mv);
        //  and set rotation
        mesh.lookAt(nv);
        i += 1;
    }

};
// create and return a new group of mesh objects using the capsule geometry
// using a aray of vector3 class instances
const createCapsuleLine = function(vectors, material, capsuleGeo){
    // defaults for arguments
    vectors = vectors || [];
    material = material || new THREE.MeshNormalMaterial({});
    capsuleGeo = capsuleGeo || new THREE.CapsuleGeometry(0.25, 1.5, 20, 20);
    // create a group and add that to the scene
    const group = new THREE.Group();
    // make mesh objects and add them to the group
    let i = 0;
    const len = vectors.length;
    while(i < len - 1){
        const v = vectors[i] || new THREE.Vector3(),
        nv = vectors[i + 1] || new THREE.Vector3(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        const mesh = new THREE.Mesh(
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
const vectorArrayToVector3Array = function(vectorArray){
    return vectorArray.map(function(a){
        if(a instanceof Array){
            return new THREE.Vector3( a[0], a[1], a[2] );
        }
        // assume that it is all ready a Vector3 and return a clone
        return a.clone();
    });
};
//-------- ----------
// VECTORS AND CAPSULE GROUP ONE
//-------- ----------
const vectors1 = vectorArrayToVector3Array([
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
]);
const vectors2 = vectorArrayToVector3Array([
    [0, 3, 0 ],
    [ 10, -6, -8 ],
    [ -5, -5, 0 ],
    [ 0, -2, 4 ],
    [ 8, 1, 4 ],
    [ 0, 5, 4 ],
    [ 4, 6, -5 ],
    [ -5, -5, -5 ]
]);
let vectors = vectorArrayToVector3Array(vectors1);
const g1 = createCapsuleLine(vectors, new THREE.MeshStandardMaterial());
scene.add( g1 );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(-10, 5, 10);
camera.lookAt(0, 0, 0);
const fps = 30,
maxFrame = 300;
let lt = new Date(),
frame = 0;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // lerp between vectors1 and vectors2 for vectors
        vectors = vectors.map(function(v, i){
            const v1 = vectors1[i], v2 = vectors2[i];
            return v1.clone().lerp(v2, bias);
        });
        // update g1 with current state of vectors
        updateCapsuleLine(g1, vectors, 2 - 1.5 * bias);
        // render, step frame
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
