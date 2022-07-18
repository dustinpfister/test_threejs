//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 10, -5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-8, 2, 4);
scene.add(dl);
//camera.add(dl);
//scene.add(camera);
scene.add( new THREE.AmbientLight(0xffffff, 0.05 ) )
//******** **********
// GRID
//******** **********
var grid = ObjectGridWrapLand.create({
    tw: 14,
    th: 14,
    crackSize: 0,
    //effects:[],
    altitude: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,0,0,0,1,1,1,1,0,
        0,0,0,1,1,1,0,0,0,1,1,1,1,0,
        0,0,0,1,1,1,0,0,0,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,1,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,1,1,1,0,
        0,1,2,2,2,1,1,0,0,0,1,1,1,0,
        0,1,1,1,1,1,0,0,0,0,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    objectIndices: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 7, 4, 6, 0, 0, 0, 7, 4, 4, 6, 0,
        0, 0, 0, 1, 0, 3, 0, 0, 0, 1, 0, 0, 3, 0,
        0, 0, 0, 8, 2, 5, 0, 0, 0, 8, 2, 2, 5, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 7, 4, 4, 6, 0, 0, 0, 0, 0, 0, 0,
        0, 7, 4, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 7, 4, 6, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 3, 0, 3, 0, 0, 0, 7, 4, 6, 0,
        0, 1, 8, 2, 5,11, 5, 0, 0, 0, 1, 0, 3, 0,
        0, 8, 2, 2, 2, 5, 0, 0, 0, 0, 8, 2, 5, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
});

grid.scale.set(1, 1, 1.25);
scene.add(grid);
//******** **********
// ADDING CHILD MESH OBJECTS
//******** **********
var mkCone = function(height){
    return new THREE.Mesh(
        new THREE.ConeGeometry(0.5, height, 30, 30),
        new THREE.MeshStandardMaterial({color: new THREE.Color('#00ff88')})
    );
};
// can make another system that involves a grid if index values
// but with child objects
var mkMeshFunctions = [
    null,
    function(){
        return mkCone(2)
    },
    function(){
        return mkCone(3)
    },
    function(){
        return mkCone(4)
    }
];
// object index grid
[
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,2,0,0,0,0,0,0,0,1,0,0,
    0,0,1,0,0,0,3,0,0,1,2,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,1,1,0,0,
    0,0,0,1,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,1,0,1,2,1,0,0,
    0,0,2,0,0,0,0,0,0,2,0,0,0,0,
    0,0,0,1,0,0,0,2,1,0,1,1,0,0,
    0,0,1,0,0,0,0,1,0,1,3,3,0,1,
    0,1,0,1,0,1,2,0,1,2,1,1,2,0,
    0,0,0,0,2,0,0,1,0,3,1,1,0,0,
    0,1,0,1,0,1,0,0,0,1,2,3,1,1,
    0,0,0,0,0,0,0,0,0,0,1,0,1,0
].forEach(function(objIndex, i){
    var mkMesh = mkMeshFunctions[objIndex];
    if(mkMesh){
        var mesh = mkMesh(),
        x = i % grid.userData.tw,
        y = Math.floor(i / grid.userData.tw)
        ObjectGridWrapLand.addAt(grid, mesh, x, y);
    }
});
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 600;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // set position of the grid
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, Math.sin( Math.PI * 2 * per ) * 0.5 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
