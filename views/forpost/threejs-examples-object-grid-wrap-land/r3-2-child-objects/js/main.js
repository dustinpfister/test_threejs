//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#00afaf');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1.0, 30);
camera.position.set(-7.09, 9.35, 9.03);
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
    tw: 14,
    th: 14,
    space: 1,
    crackSize: 0,
    effects:['opacity2'],
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
.then( (state) => {
    //******** **********
    // SET UP SOURCE OBJECTS
    //******** **********
    var sObj = state.sourceObj;
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
        sObj.land_3,
    ];
    grid = ObjectGridWrapLand.create(gridOpt);
    grid.scale.set(1, 1, 1);
    ObjectGridWrapLand.setDataTextures(grid)
    scene.add(grid);


//******** **********
// ADDING CHILD MESH OBJECTS
//******** **********
var cObjScale = 0.50;
// get a random radian
var getRandomRadian = function(){
    return Math.PI * 2 * THREE.MathUtils.seededRandom();
};
var setRandomScale = function(mesh, sMin, sMax){
    var scale = sMin + ( sMax - sMin ) * THREE.MathUtils.seededRandom();
    mesh.scale.set(scale, scale, scale);
};
// can make another system that involves a grid of index values
// but with child objects
var mkMeshFunctions = [
    null,
    function(){
        var mesh = sObj.tree_1.clone();
        mesh.material = sObj.tree_1.material.clone();
        setRandomScale(mesh, 0.25, 0.75);
        return mesh;
    },
    function(){
        var mesh = sObj.tree_2.clone();
        mesh.material = sObj.tree_2.material.clone();
        setRandomScale(mesh, 0.25, 0.75);
        mesh.rotation.y = getRandomRadian()
        return mesh;
    },
    function(){
        var mesh = sObj.tree_3.clone();
        mesh.material = sObj.tree_3.material.clone();
        setRandomScale(mesh, 0.35, 0.50);
        mesh.rotation.y = getRandomRadian()
        return mesh;
    }
];
// object index grid
[
    2,2,0,0,0,0,0,0,0,0,2,2,1,2,
    2,1,2,2,0,0,0,0,0,0,0,1,2,0,
    0,2,1,2,2,0,3,0,0,1,2,2,1,2,
    0,0,2,2,2,2,0,0,0,0,3,2,2,2,
    0,0,0,2,2,0,0,0,1,0,1,1,2,2,
    0,0,0,1,2,2,2,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,1,0,1,2,1,0,0,
    0,0,2,0,0,0,0,0,0,2,0,0,0,0,
    0,0,0,1,0,0,0,2,1,0,1,1,0,0,
    0,0,1,0,0,0,0,1,0,1,3,3,0,1,
    0,1,0,1,0,1,2,0,1,2,1,1,2,0,
    0,0,0,0,2,0,0,1,0,3,1,1,2,2,
    2,1,0,1,0,1,0,0,2,1,2,3,1,1,
    2,2,0,0,0,0,0,0,0,2,1,2,1,2
].forEach(function(objIndex, i){
    var mkMesh = mkMeshFunctions[objIndex];
    if(mkMesh){
        var mesh = mkMesh(),
        x = i % grid.userData.tw,
        y = Math.floor(i / grid.userData.tw);
        // add at method
        ObjectGridWrapLand.addAt(grid, mesh, x, y, function(tile, mesh, tileUD){
            // default to just the alt value of the tile
            mesh.position.y = tileUD.alt;
            // if tile is a cube
            if(tileUD.isCube){
                mesh.position.y = tileUD.alt + 0.25;
            }
            // if tile is a cube
            if(tileUD.isSlope){
                mesh.position.y = tileUD.alt - 0.25;
            }
            // if tile is a cube
            if(tileUD.isCorner){
                mesh.position.y = tileUD.alt - 0.25;
            }
        });
    }
});


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
