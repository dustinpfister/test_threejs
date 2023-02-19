//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
var dl = new THREE.DirectionalLight(0xffffff, 0);
dl.position.set(2, 1, 3);
scene.add(dl);
var al = new THREE.AmbientLight(0xffffff, 0);
scene.add(al);
//-------- ----------
// TEXTURES
//-------- ----------
var texture_rnd1 = datatex.seededRandom(40, 40, 1, 1, 1, [0, 255]);
// emmisve map textures
var data_square = [
    3,3,2,1,1,2,3,3,
    3,2,1,1,1,1,2,3,
    2,1,0,0,0,0,1,2,
    1,1,0,0,0,0,1,1,
    1,1,0,0,0,0,1,1,
    2,1,0,0,0,0,1,2,
    3,2,1,1,1,1,2,3,
    3,3,2,1,1,2,3,3
];
// square
var texture_square = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [32,32,32,255],
    [64,64,64,255],
    [128,128,128,255],
]);
var texture_square_cyan = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [0,32,32,255],
    [0,64,64,255],
    [0,128,128,255],
]);
var texture_square_red = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [32,0,0,255],
    [64,0,0,255],
    [128,0,0,255],
]);
var texture_square_green = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [0,32,0,255],
    [0,64,0,255],
    [0,128,0,255],
]);
var texture_square_blue = datatex.fromPXDATA(data_square, 8, [
    [0,0,0,255],
    [0,0,32,255],
    [0,0,64,255],
    [0,0,128,255],
]);
//-------- ----------
// GRID OPTIONS
//-------- ----------
var tw = 9,
th = 9,
space = 2;
// source objects
var mkBox = function(color, h, emmisive_texture){
    emmisive_texture = emmisive_texture || texture_square;
    var box = new THREE.Group();
    var a = space * 0.75;
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( a, h, a),
        new THREE.MeshStandardMaterial({ 
            color: color,
            map: texture_rnd1,
            emissive: new THREE.Color('white'),
            emissiveMap: emmisive_texture,
            emissiveIntensity: 1}) );
    mesh.position.y = h / 2;
    //mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture_rnd1}) );
    ground.position.y = 0.05 * -1;
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkBox(0x00ffff, 0.25, texture_square_cyan),
    mkBox(0xff0000, 4.75, texture_square_red),
    mkBox(0x00ff00, 3.50, texture_square_green),
    mkBox(0x0000ff, 1.25, texture_square_blue)
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
];
//-------- ----------
// CREATE GRID
//-------- ----------
var grid = ObjectGridWrap.create({
    space: space,
    tw: tw,
    th: th,
    dAdjust: 1.25,
    effects: ['opacity2', 'scale', 'rotationB'],
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
// minB value can be used to adjust min distance for opacity drop off
// when it comes to using the opacity2 effect
grid.userData.minB = 0.25;
scene.add(grid);
var setGridemissiveIntensity = function(emissiveIntensity){
    emissiveIntensity = emissiveIntensity || 0;
    grid.children.forEach(function(g){
         g.children.forEach(function(child){
             child.material.emissiveIntensity = emissiveIntensity;
         })
    });
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // default light intensity for al and dl is 0
    dl.intensity = 0;
    al.intensity = 0;
    setGridemissiveIntensity(1);
    ObjectGridWrap.setPos(grid, (1 - a1) * 2, Math.cos(Math.PI * a2) * 0.25 );
    ObjectGridWrap.update(grid);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
