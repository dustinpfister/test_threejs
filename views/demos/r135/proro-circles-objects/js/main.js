//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#4a4a4a');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
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


//******** **********
// LINES
//******** **********

// just create one circle for a set of circles that form a sphere like shape
// createSphereCirclePoints(maxRadius, circleCount, circleIndex, pointsPerCircle)
var createSphereCirclePoints = function(maxRadius, circleCount, circleIndex, pointsPerCircle){
    var points = [];
    var sPer = circleIndex / circleCount;
    var radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
    var y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
    var i = 0;
    // buch points for the current circle
    while(i < pointsPerCircle){
        // might want to subtract 1 or 0 for this cPer expression
        var cPer =  i / (pointsPerCircle - 1);
        var radian = Math.PI * 2 * cPer;
        var v = new THREE.Vector3();
        v.x = Math.cos(radian) * radius;
        v.y = y;
        v.z = Math.sin(radian) * radius;
        points.push(v);
        i += 1;
    }
    return points;
};

var createSphereObjects = function(maxRadius, circleCount, pointsPerCircle, colors){
    colors = colors || [0xff0000, 0x00ff00, 0x0000ff, 0x00ffff, 0xff00ff, 0xffff00]
    var wrap = new THREE.Group();
    var i = 1;
    while(i < circleCount + 1){
        var cPer = i / (circleCount + 1);
        var p = createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle);
        p.forEach(function(v, vi){
            //var geo = new THREE.BoxGeometry(0.5, 0.25 + 3.0 * cPer, 0.5)
            var len = 4 - Math.random() * 3;
            var geo = new THREE.ConeGeometry(0.25, len, 30);
            geo.translate(0, len / 2,0)
            geo.rotateX(Math.PI * 1.5);

            var mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
                color: colors[vi % colors.length]
            }));
            mesh.position.copy(v);
            mesh.lookAt(0, 0, 0);
            wrap.add(mesh);
        });
        i += 1;
    };
    return wrap;
};

var g = createSphereObjects(5, 10, 25);
var geo = new THREE.SphereGeometry(5.0, 20, 20);
var mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
    color: 0xffffff
}));
g.add(mesh)
scene.add(g);


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

        g.rotation.y = Math.PI * 2 * per;

        renderer.render(scene, camera);

       

        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
