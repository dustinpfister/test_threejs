//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-4, 3, 4);
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
scene.add( new THREE.AmbientLight(0xffffff, 0.25 ) );
//******** **********
// GRID OPTIONS
//******** **********
var gridOpt = {
    tw: 8,
    th: 8,
    space: 1,
    crackSize: 0,
    effects:['opacity2'],
    altitude: [
        0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,1,0,
        0,1,1,1,1,1,1,0,
        0,1,2,2,2,1,1,0,
        0,1,2,2,2,1,1,0,
        0,1,2,2,2,1,1,0,
        0,1,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0
    ],
    objectIndices: [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 7, 4, 4, 6, 0,
        0, 7, 4, 9, 0, 0, 3, 0,
        0, 1, 7, 4, 6, 0, 3, 0,
        0, 1, 1, 0, 3, 0, 3, 0,
        0, 1, 8, 2, 5,11, 5, 0,
        0, 8, 2, 2, 2, 5, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ]
};
//******** **********
// LOOP
//******** **********
var fps = 30,
grid,
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
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, 0.75 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
//******** **********
// LOAD
//******** **********
ObjectGridWrapLand.load('/dae/land-set-one/land-set-1c.dae')
.then( (state) => {
    //******** **********
    // SET UP SOURCE OBJECTS
    //******** **********
    gridOpt.sourceObjects = state.gridOpt.sourceObjects;
    grid = ObjectGridWrapLand.create(gridOpt);
    grid.scale.set(1, 1, 1);
    scene.add(grid);
    //******** **********
    // START LOOP
    //******** **********
    loop();
});

