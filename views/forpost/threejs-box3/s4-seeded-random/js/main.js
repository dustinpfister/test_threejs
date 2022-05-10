var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(-2, 0.5, 4);
camera.lookAt(0, -0.25, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// create a new box3 with helper
var min = new THREE.Vector3(-1.0, -1.0, -1.0),
max = new THREE.Vector3(1.0, 1.0, 1.0);
var box3 = new THREE.Box3(min, max);
var box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
// HELPER FUNCTIONS
var setAxis = function(mesh, box3, axis, per){
    var meshSize = new THREE.Vector3()
    mesh.geometry.boundingBox.getSize(meshSize);

    mesh.position[axis] = box3.min[axis] + meshSize[axis] / 2  + ( boxSize[axis] - meshSize[axis] ) * per;
};
var rnd1 = function(){
    return Math.random();
};
var rnd2 = function(){
    return THREE.MathUtils.seededRandom();
};
// CREATE AND POSITION MESH OBJECTS IN THE BOX
var i = 0, len = 10;
while(i < len){
    var w = 0.2 + 0.3 * rnd2(),
    h = 0.2,
    d = 0.2 + 0.8 * rnd2()
    var mesh = new THREE.Mesh( 
        new THREE.BoxGeometry(w, h, d), 
        new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.25
        }) 
    );
    // get box size
    var boxSize = new THREE.Vector3();
    box3.getSize(boxSize);
    // get mesh size
    mesh.geometry.computeBoundingBox();

    setAxis(mesh, box3, 'x', rnd2());
    setAxis(mesh, box3, 'y', rnd2());
    setAxis(mesh, box3, 'z', rnd1());

    scene.add(mesh);
    i += 1;
};


// render
renderer.render(scene, camera);