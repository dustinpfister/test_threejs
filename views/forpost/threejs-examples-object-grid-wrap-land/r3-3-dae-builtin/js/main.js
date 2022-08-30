//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-8, 5, -8);
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
    //effects:[],
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
grid1,
grid2,
lt = new Date(),
frame = 0,
maxFrame = 600;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        ObjectGridWrap.setPos(grid1, ( 1 - per ) * 2, 0.75 );
        ObjectGridWrap.setPos(grid2, ( 1 - per ) * 2, 0.75 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid1);
        ObjectGridWrap.update(grid2);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
//******** **********
// LOAD
//******** **********
// scale and rotate should be done in landjs, and I only need to give values here if needed
var srlo = ObjectGridWrapLand.scaleAndRotateLandObject;
ObjectGridWrapLand.load('/dae/land-set-one/land-set-1c.dae')
.then( (sObj) => {
    //******** **********
    // grid1 - WITH MODULE BUILT IN OBJECTS
    //******** **********
    grid1 = ObjectGridWrapLand.create(gridOpt);
    grid1.position.set(0, 0, 4);
    grid1.scale.set(1, 1, 1);
    ObjectGridWrapLand.setDataTextures(grid1);
    scene.add(grid1);
    //******** **********
    // grid2 - WITH DAE SOURCE OBJECTS
    //******** **********
    gridOpt.sourceObjects = [
        sObj.land_0,
        sObj.land_1,
        sObj.land_1,
        sObj.land_1,
        sObj.land_1,
        sObj.land_2,
        sObj.land_2,
        sObj.land_2,
        sObj.land_2,
        sObj.land_3,
        sObj.land_3,
        sObj.land_3,
        sObj.land_3
    ];
    grid2 = ObjectGridWrapLand.create(gridOpt);
    grid2.position.set(0, 0, -4);
    grid2.scale.set(1, 1, 1);
    //ObjectGridWrapLand.setDataTextures(grid)
    scene.add(grid2);
    //******** **********
    // START LOOP
    //******** **********
    loop();
});

//******** **********
// OVERRIDE MATERIAL
//******** **********
//scene.overrideMaterial = new THREE.MeshPhongMaterial({
//    wireframe: true
//});
//******** **********
// ORBIT CONTROLS
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.domElement.addEventListener('pointerup', function(){
   var pos = camera.position;
   var rot = camera.rotation;
   console.log(pos.x.toFixed(2), pos.y.toFixed(2), pos.z.toFixed(2));
   console.log(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2));
});
