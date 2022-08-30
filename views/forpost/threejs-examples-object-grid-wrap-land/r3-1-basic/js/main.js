//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-9, 5, 9);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// ORBIT CONTROLS
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.domElement.addEventListener('pointerup', function(){
   var pos = camera.position;
   var rot = camera.rotation;
   console.log(pos.x.toFixed(2), pos.y.toFixed(2), pos.z.toFixed(2));
   console.log(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2));
})
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
    tw: 14,
    th: 14,
    space: 1,
    crackSize: 0,
    //effects:['opacity2'],
    effects:[],
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
        //ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, Math.sin( Math.PI * 2 * per ) * 0.5 );

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
ObjectGridWrapLand.load('/dae/land-set-one/land-set-1c.dae')
.then( (sObj) => {
    //******** **********
    // SET UP SOURCE OBJECTS
    //******** **********
    gridOpt.sourceObjects = [
        scaleAndRotateLandObject(sObj.land_0, 1, 0, 0, 0),

        scaleAndRotateLandObject(sObj.land_1, 1, 0, 0.75, 0),
        scaleAndRotateLandObject(sObj.land_1, 1, 0, 1.00, 0),
        scaleAndRotateLandObject(sObj.land_1, 1, 0, 1.25, 0),
        scaleAndRotateLandObject(sObj.land_1, 1, 0, 1.50, 0),

        scaleAndRotateLandObject(sObj.land_2, 1, 0.75, 0.75, 0),
        scaleAndRotateLandObject(sObj.land_2, 1, 0.75, 0.00, 0),
        scaleAndRotateLandObject(sObj.land_2, 1, 0.75, 0.25, 0),
        scaleAndRotateLandObject(sObj.land_2, 1, 0.75, 0.50, 0),

        scaleAndRotateLandObject(sObj.land_3, 1, 0, 0.50, 0),
        scaleAndRotateLandObject(sObj.land_3, 1, 0, 0.75, 0),
        scaleAndRotateLandObject(sObj.land_3, 1, 0, 0.00, 0),
        scaleAndRotateLandObject(sObj.land_3, 1, 0, 0.25, 0)
    ];
    grid = ObjectGridWrapLand.create(gridOpt);
    ObjectGridWrapLand.setDataTextures(grid)
    scene.add(grid);
    //******** **********
    // START LOOP
    //******** **********
    loop();
});

