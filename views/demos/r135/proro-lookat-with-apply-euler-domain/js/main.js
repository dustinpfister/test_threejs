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

// materuials to use for mesh objects
var materials = [
    new THREE.MeshNormalMaterial()
];

// make a part of the object
var mkPart = function(g, partName, w, h, d, x, y, z){
    // the mesh object
    var m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    materials[0]);
    // name of part
    m.name = g.name + '_' + partName;
    // position it
    m.position.set(x, y, z);
    return m;
};

// make the whole group with all parts
var mkModel = function(gName){
    var g = new THREE.Group();
    g.name = gName || 'g-' + g.uuid;
    // add parts
    g.add( mkPart(g, 'body', 1, 1, 4, 0, 0, 0) );
    g.add( mkPart(g, 'tain', 0.5, 1, 1, 0, 1, -1.5) );
    g.add( mkPart(g, 'rwing', 2, 0.5, 1, -1.5, 0, 0) );
    g.add( mkPart(g, 'lwing', 2, 0.5, 1, 1.5, 0, 0) );
    return g;
};

// make a collection of them

var count = 10, i = 0;
var wrap = new THREE.Group();
scene.add(wrap);
while(i < count){
   var g = mkModel('g' + i);
   g.position.x = -3 + 6 * (i / count);
   wrap.add(  g );
   i += 1;
}

//******** **********
//
//******** **********
renderer.render(scene, camera);