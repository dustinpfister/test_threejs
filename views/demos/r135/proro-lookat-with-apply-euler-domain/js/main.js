//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10, 0x00ff00) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var mkPart = function(gid, partName, w, h, d, x, y, z){
    // the mesh object
    var m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    materials[0]);
    // name of part
    m.name = gid + '_' + partName;
    // position it
    m.position.set(x, y, z);
    return m;
};

var materials = [
    new THREE.MeshNormalMaterial()
];

var g = new THREE.Group();

// add parts
g.add( mkPart('g1', 'body', 1, 1, 4, 0, 0, 0) );
g.add( mkPart('g1', 'tain', 0.5, 1, 1, 0, 1, -1.5) );
g.add( mkPart('g1', 'rwing', 2, 0.5, 1, -1.5, 0, 0) );
g.add( mkPart('g1', 'lwing', 2, 0.5, 1, 1.5, 0, 0) );


scene.add(g);

g.lookAt(1, 0, 0)

//******** **********
//
//******** **********
renderer.render(scene, camera);