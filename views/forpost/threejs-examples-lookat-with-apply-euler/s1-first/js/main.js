//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#8a8a8a');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//******** **********
// HELPER FUNCTIONS
//******** **********
// materuials to use for mesh objects
var materials = [
    new THREE.MeshStandardMaterial({color: new THREE.Color('cyan')}),
    new THREE.MeshStandardMaterial({color: new THREE.Color('red')})
];

// make a part of the object
var mkPart = function(g, partName, w, h, d, x, y, z, mi){
    // the mesh object
    var m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    materials[mi === undefined ? 0 : mi]);
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
    g.add( mkPart(g, 'tail', 0.5, 1, 1, 0, 1, -1.5, 1) );
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

// position a wrap object
var positionWrap = function(wrap, bias, ringCount){

    bias = bias === undefined ? 1 : bias;
    ringCount = ringCount === undefined ? 5 : ringCount;

    var count = wrap.children.length,
    i = 0;
    perRing = count / ringCount,
    radius = 15; 

    var yaStep = 90 / ringCount;
    while(i < count){
        var per = i / count;
        var g = wrap.children[i];
        var ring = Math.floor( i / perRing );
        var rPer = ( i - perRing * ring) / perRing;
        var x = Math.PI * 2 * rPer, 
        s = ring < ringCount / 2 ? 0 : 1;
        y = Math.PI / 180 * yaStep * ring * bias, 
        z = 0;
        var e = new THREE.Euler(x, y, z);
        g.position.set(0, 0, radius).applyEuler( e );
        g.lookAt(0, 0, 0);
        i += 1;
    }
};

//
var wrapA = createWrap();
positionWrap(wrapA, 1);
scene.add(wrapA);

var wrapB = createWrap();
positionWrap(wrapB, -1);
scene.add(wrapB);




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
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        positionWrap(wrapA, 1 - 1 * bias, 5);
        positionWrap(wrapB, -1 + 1 * bias, 5 );

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
