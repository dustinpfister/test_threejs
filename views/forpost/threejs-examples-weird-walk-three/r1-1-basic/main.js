//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#004a4a');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-13, 3, -6);
var renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.15));
//******** **********
// TEXTURE
//******** **********
var texture_rnd1 = datatex.seededRandom(40, 40, 1, 1, 1, [128,255]);
var texture_rnd2 = datatex.seededRandom(100, 100, 1, 1, 1, [128,255]);
//******** **********
// GRID OPTIONS
//******** **********
var tw = 9,
th = 15,
space = 4;
// source objects
var mkGround = function(){
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0x00af00, map: texture_rnd1}) );
    ground.position.y = 0.05 * -1;
    return ground;
};
var mkBox = function(color, h){
    var box = new THREE.Group();
    var a = space * 0.5;
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( a, h, a),
        new THREE.MeshStandardMaterial({ color: color, map: texture_rnd1}) );
    mesh.position.y = h / 2;
    //mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = mkGround();
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkGround(),
    mkBox(0x00ffff, 0.50),
    mkBox(0xff00ff, 1.00),
    mkBox(0x0000ff, 1.50),
    mkBox(0x00ff00, 2.00),
    mkBox(0xffff00, 2.50),
    mkBox(0xff8f00, 3.50),
    mkBox(0xff0000, 4.00),
    mkBox(0xffffff, 7.00)
];
var array_oi = [
0,0,0,2,4,0,0,0,8,
0,0,0,1,4,0,0,0,7,
0,0,0,1,5,0,0,8,7,
0,0,0,2,5,7,0,0,7,
0,0,0,2,6,0,0,0,8,
0,0,0,1,5,7,0,0,7,
0,0,0,3,5,0,0,0,7,
0,0,0,1,4,7,0,0,8,
0,0,0,2,4,0,0,0,7,
0,0,0,3,4,0,0,0,7,
0,0,0,2,4,0,0,0,7,
0,0,0,1,4,0,0,0,8,
0,0,0,1,4,7,0,0,7,
0,0,0,2,4,0,0,8,7,
0,0,0,3,4,0,0,0,7
]
//******** **********
// CREATE GRID
//******** **********
var grid = ObjectGridWrap.create({
    space: space + 0.5,
    tw: tw,
    th: th,
    dAdjust: 1.25,
    //effects: ['scale'],
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
scene.add(grid);
//******** **********
// WERID WALK THREE
//******** **********
var m = new THREE.MeshStandardMaterial({
    map: texture_rnd1,
    color: 0xafafaf
});
var m2 = new THREE.MeshStandardMaterial({
    map: texture_rnd2,
    color: 0xdfdfdf
});
var ww3_1 = WeirdWalk.create({
    legCount: 3,
    radius: 2.25,
    bodyLegChild: true,
    materials: {
        foot: m,
        calf: m,
        center: m2
    }
});
var s = 0.5;
ww3_1.scale.set(s, s, s);
ww3_1.position.set(-7, 2.7, -3);
scene.add(ww3_1);
//******** **********
// STATIC GROUND
//******** **********

var staticGround = mkGround();
staticGround.position.y = -0.25;
staticGround.material = new THREE.MeshStandardMaterial({color: 0x00faf00})
staticGround.scale.set(20, 1, 20);
scene.add(staticGround);

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
        //ObjectGridWrap.setPos(grid, (1 - per) * 2, Math.cos(Math.PI * bias) * 0.25 );
        ObjectGridWrap.setPos(grid, 0.1, per * 1 );
        ObjectGridWrap.update(grid);

        ww3_1.userData.legs.rotation.x = -Math.PI * 6 * per;
        ww3_1.userData.legs.rotation.z = Math.PI / 180 * 5;

        camera.lookAt(ww3_1.position.clone().add(new THREE.Vector3(0,-0.5,0)));


        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
