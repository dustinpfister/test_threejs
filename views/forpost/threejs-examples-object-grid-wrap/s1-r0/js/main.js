
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#4a4a4a');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
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
dl.position.set(2, -1, -1.5);
scene.add(dl);


var grid = ObjectGridWrap.create({
    space: 1.5,
    tw: 6,
    th: 5,
    aOpacity: 1.25,
    objectIndices: [
        1,1,1,1,1,0,
        1,0,0,0,1,0,
        1,0,1,0,1,0,
        1,0,0,0,1,0,
        1,1,1,1,1,0]
});
scene.add(grid);


//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.addEventListener('change', function(a, b){
})

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

        
        ObjectGridWrap.setPos(grid, (1 - per) * 4, Math.cos(Math.PI * bias));

        ObjectGridWrap.update(grid);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};

//renderer.render(scene, camera);

loop();
