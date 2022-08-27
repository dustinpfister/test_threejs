//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(15, 15, 15);
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
scene.add( new THREE.AmbientLight(0xffffff, 0.05 ) );
//******** **********
// GRID OPTIONS
//******** **********
var gridOpt = {
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
};
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
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
        // set position of the grid
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, Math.sin( Math.PI * 2 * per ) * 0.5 );

        //ObjectGridWrap.setPos(grid, 0.2, 0.75 );

        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
//******** **********
// DAE - load land-set-one dae file
//******** **********
// CREATE A COLLADALOADER INSTANCE
var loader = new THREE.ColladaLoader();
// CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
// TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
// AS THE SECOND ARGUMENT
loader.load("/dae/land-set-one/land-set-1b.dae", function (result) {
    console.log(result.scene);
    //******** **********
    // CREATE GRID with gridOpt
    //******** **********

    var land0 = result.scene.getObjectByName('land-0');
    //land0.geometry.scale(2, 2, 2);
    var land1 = result.scene.getObjectByName('land-1');
    //land1.geometry.scale(2, 2, 2);
    var land2 = result.scene.getObjectByName('land-2');
    var land3 = result.scene.getObjectByName('land-3');

    //!!! scale and rotate land object helper that should be part of land module
    // but I am just making it here for now
    var scaleAndRotateLandObject = function(sourceMesh, scale, rx, ry, rz){
        var mesh = sourceMesh.clone();
        var geo = mesh.geometry = sourceMesh.geometry.clone();

        geo.scale(scale, scale, scale);
        geo.rotateX(Math.PI * 2 * rx);
        geo.rotateY(Math.PI * 2 * ry);
        geo.rotateZ(Math.PI * 2 * rz);

        return mesh;
    };

    // source objects
    gridOpt.sourceObjects = [
        scaleAndRotateLandObject(land0, 2, 0, 0, 0),

        scaleAndRotateLandObject(land1, 2, 0, 0.75, 0),
        scaleAndRotateLandObject(land1, 2, 0, 1.00, 0),
        scaleAndRotateLandObject(land1, 2, 0, 1.25, 0),
        scaleAndRotateLandObject(land1, 2, 0, 1.50, 0),

        scaleAndRotateLandObject(land2, 2, 0.75, 0.75, 0),
        scaleAndRotateLandObject(land2, 2, 0.75, 0.00, 0),
        scaleAndRotateLandObject(land2, 2, 0.75, 0.25, 0),
        scaleAndRotateLandObject(land2, 2, 0.75, 0.50, 0),

        scaleAndRotateLandObject(land3, 2, 0, 0.50, 0),
        scaleAndRotateLandObject(land3, 2, 0, 0.75, 0),
        scaleAndRotateLandObject(land3, 2, 0, 0.00, 0),
        scaleAndRotateLandObject(land3, 2, 0, 0.25, 0)
    ];

    grid = ObjectGridWrapLand.create(gridOpt);
    grid.scale.set(1, 1, 1);
    ObjectGridWrapLand.setDataTextures(grid)
    scene.add(grid);
    //******** **********
    // START LOOP
    //******** **********
    loop();
});
