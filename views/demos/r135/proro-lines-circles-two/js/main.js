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
        //var a = v.clone().normalize().multiplyScalar( maxRadius - randomDelta * THREE.MathUtils.seededRandom() );
        // other cool ideas with deltas
        //var a = v.clone().normalize().multiplyScalar( 1 + maxRadius * (i / (perCircle - 1)) );
        //var a = v.clone().normalize().multiplyScalar( (maxRadius * (cPer * 1.25 + sPer * 5)) * 0.25 );
        points.push(v);
        i += 1;
    }
    return points;
};

var createSphereLines = function(maxRadius, circleCount, pointsPerCircle){
    var lines = new THREE.Group();
    var i = 1;
    while(i < circleCount + 1){
        var p = createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle);
        var geometry = new THREE.BufferGeometry().setFromPoints( p);
        var line = scene.userData.line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x00ff00,
                linewidth: 4
            })
        );
        lines.add(line);
        i += 1;
    };

    return lines;
};

var g = createSphereLines(5, 10, 50);
console.log(g);
scene.add(g);

/*
var p = createSphereCirclePoints(5, 20, 10, 30);
var geometry = new THREE.BufferGeometry().setFromPoints( p);
var line = scene.userData.line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
       color: 0x00ff00,
        linewidth: 2
    })
);
scene.add(line);
*/
/*
var createPoints1 = function(maxRadius, circleCount, perCircle, randomDelta){
    maxRadius = maxRadius === undefined ? 5 : maxRadius;
    circleCount = circleCount === undefined ? 5 : circleCount;
    perCircle = perCircle === undefined ? 5 : perCircle;
    randomDelta = randomDelta === undefined ? 1 : randomDelta;
    var points = [];
    // for each circle
    var c = 0;
    while(c < circleCount){
        var sPer = c / circleCount;
        var radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
        var y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
        var i = 0;
        // buch points for the current circle
        while(i < perCircle){
            // might want to subtract 1 or 0 for this cPer expression
            var cPer =  i / (perCircle - 1);
            var radian = Math.PI * 2 * cPer;
            var v = new THREE.Vector3();
            v.x = Math.cos(radian) * radius;
            v.y = y;
            v.z = Math.sin(radian) * radius;

            var a = v.clone().normalize().multiplyScalar( maxRadius - randomDelta * THREE.MathUtils.seededRandom() );

            // other cool ideas with deltas
            //var a = v.clone().normalize().multiplyScalar( 1 + maxRadius * (i / (perCircle - 1)) );
            //var a = v.clone().normalize().multiplyScalar( (maxRadius * (cPer * 1.25 + sPer * 5)) * 0.25 );

            points.push(a);
            i += 1;
        }
        c += 1;
    }
    return points;
};


var p = createPoints1(5, 20, 20, 0);
console.log(p)

var geometry = new THREE.BufferGeometry().setFromPoints( p);


var line = scene.userData.line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
       color: 0x00ff00,
        linewidth: 2
    })
);
scene.add(line);
*/

/*
var mesh = scene.userData.mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
);
scene.add(mesh);
*/

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
