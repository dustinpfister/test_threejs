//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
//******** **********
// GRID OPTIONS
//******** **********
var tw = 9,
th = 9,
space = 1.5;
// source objects
var mkBox = function(color, h){
    var box = new THREE.Group();
    var a = space * 0.95;
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( a, h, a),
        new THREE.MeshStandardMaterial({ color: color}) );
    mesh.position.y = h / 2;
    //mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    ground.position.y = 0.05 * -1;
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkBox(0x00ffff, 0.25), //new THREE.Object3D(),
    mkBox(0xff0000, 10.00),
    mkBox(0xffff00, 4.50),
    mkBox(0x00ff00, 1.50)
];

var array_oi = [
0,0,0,0,0,3,3,0,0,
0,0,0,0,3,2,3,0,0,
0,0,0,3,2,3,3,0,0,
0,0,3,2,2,2,3,0,0,
0,3,2,2,1,2,3,0,0,
3,2,3,2,2,2,2,3,0,
0,3,0,3,3,3,2,3,0,
0,0,0,0,0,0,3,3,0,
0,0,0,0,0,0,0,0,0
]

//******** **********
// CREATE GRID
//******** **********
var grid = ObjectGridWrap.create({
    space: 3,
    tw: tw,
    th: th,
    dAdjust: 1.25,
    effects: ['opacity'],
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
scene.add(grid);


//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        // set position of the grid
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, Math.cos( Math.PI * bias ) * 0.25 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
