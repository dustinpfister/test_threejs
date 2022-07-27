// apLerp module -r0 prototype
var apLerp = (function () {

    var api = {};

    api.getPointsBetween = function(v1, v2, count, include){

        count = count === undefined ? 1 : count;
        include = include === undefined ? false : include;

        var d = 1 / (count + 1);

        var points = [];
        var i = 0;
        while(i < count){


            var v = v1.clone().lerp(v2, d + d * i);
            points.push(v);
            i += 1;
        }

        if(include){
           points.unshift(v1);
           points.push(v2);
        }

        return points;

    };

    return api;

}
    ());

(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(2, 1, 2);
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
    

var v1 = new THREE.Vector3(0, 0, 0);
var v2 = new THREE.Vector3(0, 3, 0);
console.log(apLerp.getPointsBetween(v1, v2, 4, true))

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
