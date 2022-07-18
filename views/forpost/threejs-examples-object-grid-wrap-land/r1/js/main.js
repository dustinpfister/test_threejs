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
// TEXTURE
//******** **********
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Uisng the seeded random method of the MathUtils object
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4;
    var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
//******** **********
// GRID
//******** **********
var grid = ObjectGridWrapLand.create({
    tw: 14,
    th: 14,
    crackSize: 0.03,
    MATERIAL_LAND: new THREE.MeshStandardMaterial({
        color: new THREE.Color('lime'),
        map: texture
    }),
    effects:[],
    altitude: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,1,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,0,0,0,0,
        0,1,2,2,2,1,1,0,0,0,0,0,0,0,
        0,1,1,1,1,1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    objectIndices: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 7, 4, 4, 6, 0, 0, 0, 0, 0, 0, 0,
        0, 7, 4, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 7, 4, 6, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 8, 2, 5,11, 5, 0, 0, 0, 0, 0, 0, 0,
        0, 8, 2, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
});

grid.scale.set(1, 1, 1.25);
scene.add(grid);
//******** **********
// workinbg with tiles
//******** **********
// can play with tiles of grid this way
[34, 44, 54, 33, 43, 53, 32, 42, 52].forEach(function(i){
    var tile = grid.children[i];
    tile.material.color = new THREE.Color('yellow');
});
var mkCone = function(){
    return new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 3, 30, 30),
        new THREE.MeshStandardMaterial({map: texture, color: new THREE.Color('green')})
    );
    //return new THREE.Mesh(
    //    new THREE.BoxGeometry(1, 2, 1),
    //    new THREE.MeshStandardMaterial({map: texture, color: new THREE.Color('green')})
    //);
};
// can add a child to a tile this way
var tile = grid.children[143];
tile.material.color = new THREE.Color('#00ffaa');
var mesh = mkCone();
const box = new THREE.Box3();
tile.geometry.computeBoundingBox();
box.copy( tile.geometry.boundingBox ).applyMatrix4( tile.matrixWorld );
// on cubes add half hight, on slopes add 0
mesh.geometry.computeBoundingBox();
var v = new THREE.Vector3();
mesh.geometry.boundingBox.getSize(v);
var yDelta = tile.userData.isSlope ? 0 : v.y / 2;
console.log(yDelta);
mesh.position.y = box.max.y + yDelta;
tile.add(mesh);
// If this above code works okay in a project I can use the addAt method
// that is based off of that with beter yDelta adjustment
ObjectGridWrapLand.addAt(grid, mkCone(), 0);
ObjectGridWrapLand.addAt(grid, mkCone(), 10, 5);
ObjectGridWrapLand.addAt(grid, mkCone(), 1, 10);
ObjectGridWrapLand.addAt(grid, mkCone(), 1, 12);
ObjectGridWrapLand.addAt(grid, mkCone(), 3, 8);
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
        //ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, 0 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
