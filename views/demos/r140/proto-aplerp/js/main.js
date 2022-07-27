// apLerp module -r0 prototype
var apLerp = (function () {

    var api = {};

    // The main get points between method that will return an array of Vector3
    // instances between the two that are given. The include bool can be used to
    // also include clones of v1 and v2 and the start and end.
    api.getPointsBetween = function(v1, v2, count, include){
        count = count === undefined ? 1 : count;
        include = include === undefined ? false : include;

        var points = [];
        var i = 0;
        while(i < count){

            // simple lerp
/*
var d = 1 / (count + 1);
var a = d + d * i;
*/
// Math.pow lerp
/*
var base = 2.0;
var e = 16;
var inv = true;

var p = i / count;
var m = Math.pow(base, e * p) / Math.pow(base, e);
var a = inv ? 1 - m : m;
*/

// Math.pow lerp with d from 0.5
var base = 2.0;
var e = 10;
var p = (i + 1) / (count + 1);
var d = Math.sqrt( Math.pow(p - 0.5, 2) );
var s = p > 0.5 ? -1 : 1;
var a = 0.5 - ( Math.pow(base, e * ( 0.5 + d ) ) / Math.pow(base, e) * 0.5 ) * s;



console.log(a, p, d.toFixed(2));


            var v = v1.clone().lerp(v2, a);
            points.push(v);
            i += 1;
        }
        if(include){
           points.unshift(v1.clone());
           points.push(v2.clone());
        }
        return points;
    };

    return api;

}
    ());

(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3);
    scene.add(dl);
    scene.add( new THREE.AmbientLight(0xafafaf, 0.25) );
    

// POINTS
var v1 = new THREE.Vector3(-5, 0, 0);
var v2 = new THREE.Vector3(5, 0, 0);

var points = apLerp.getPointsBetween(v1, v2, 28, true);

var group = new THREE.Group();
scene.add(group);
points.forEach(function(v){
    var mesh = new THREE.Mesh( new THREE.SphereGeometry(0.125, 30, 30), new THREE.MeshNormalMaterial() );
    mesh.position.copy(v);
    group.add(mesh);
});

    // CONTROL
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // APP LOOP
    var frame = 0, frameMax = 300;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;

        frame += 1;
        frame %= frameMax;
    };
    loop();
}
    ());
