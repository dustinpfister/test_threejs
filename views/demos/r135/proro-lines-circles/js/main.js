//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES
//******** **********

var createPoints1 = function(){
    var points = [];
    // for each circle
    var c = 0, circleCount = 3;
    while(c < circleCount){
        var y = 0;
        var radius = 3 - (c / circleCount);
        var i = 0, len = 10;
        while(i < len){
            var radian = Math.PI * 2 * ( i / len );
            var v = new THREE.Vector3();
            v.x = Math.cos(radian) * radius;
            v.y = y;
            v.z = Math.sin(radian) * radius;

            points.push(v);
            i += 1;
        }
        c += 1;
    }
    return points;
};

var p = createPoints1();
console.log(p)

var geometry = new THREE.BufferGeometry().setFromPoints( p);
var line = scene.userData.line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
       color: 0x00ff00,
        linewidth: 6
    })
);
scene.add(line);

//******** **********
// LOOP
//******** **********

new THREE.OrbitControls(camera, renderer.domElement);

var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
