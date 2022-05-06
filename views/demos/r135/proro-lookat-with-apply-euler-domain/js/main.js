//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10, 0x00ff00) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
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
var createWrap = function(){
    var wrap = new THREE.Group();
    var i = 0, count = 50;
    while(i < count){
        var g = mkModel('g' + i);
        wrap.add(  g );
        i += 1;
    }
    wrap.scale.set(0.5, 0.5, 0.5);
    return wrap;
};


var wrap = createWrap();
scene.add(wrap);

var count = 50, 
i = 0;
perRing = 20,
radius = 15,
ringCount = count / perRing,
bias = -1
var yaStep = 90 / ringCount;
while(i < count){
   var per = i / count;
   var g = wrap.children[i];
console.log();
   //var g = mkModel('g' + i);

   var ring = Math.floor( i / perRing );

   var rPer = ( i - perRing * ring) / perRing;

   var x = Math.PI * 2 * rPer, 
   s = ring < ringCount / 2 ? 0 : 1;
   y = Math.PI / 180 * yaStep * ring * bias, 
   z = 0;
   var e = new THREE.Euler(x, y, z);
   g.position.set(0, 0, radius).applyEuler( e );

   g.lookAt(0, 0, 0);

   //wrap.add(  g );
   i += 1;
}


//******** **********
//
//******** **********

new THREE.OrbitControls(camera, renderer.domElement);

var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
