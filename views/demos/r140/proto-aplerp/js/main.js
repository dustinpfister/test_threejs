// apLerp module -r0 prototype
var apLerp = (function () {
    // built in get alpha methods
    var GET_ALPHA_METHODS = {};
    // simple lerp
    GET_ALPHA_METHODS.simp = function(state){
        var d = 1 / (state.count + 1);
        return d + d * state.i;
    };
    // pow1 from v1 to v2
    GET_ALPHA_METHODS.pow1 = function(state, param){
        var base = param.base === undefined ? 2.0 : param.base;
        var e = param.e === undefined ? 16 : param.e;
        var invert = param.invert === undefined ? false : param.invert;
        var p = state.i / state.count;
        var m = Math.pow(base, e * p) / Math.pow(base, e);
        return invert ? 1 - m : m;
    };
    // pow2 using distance from 0.5 of i / count;
    GET_ALPHA_METHODS.pow2 = function(state, param){
        var base = param.base === undefined ? 2.0 : param.base;
        var e = param.e === undefined ? 16 : param.e;
        var p = (state.i + 1) / (state.count + 1);
        var d = Math.sqrt( Math.pow(p - 0.5, 2) );
        var s = p > 0.5 ? -1 : 1;
        return 0.5 - ( Math.pow(base, e * ( 0.5 + d ) ) / Math.pow(base, e) * 0.5 ) * s;
    };

    GET_ALPHA_METHODS.porabola = function(state, param){
        //var h = param.h === undefined ? 0 : param.h;
        //var k = param.k === undefined ? 0 : param.k;

        var h = 0.4, k = 0.125;
        var x = state.i / (state.count - 1); 
        var y = Math.pow(x - h, 2) + k;
        var a = (x > 0.5 ? 0.5 - y : y) * 2;
        return a
    };

    // public api
    var api = {};
    // The main get points between method that will return an array of Vector3
    // instances between the two that are given. The include bool can be used to
    // also include clones of v1 and v2 and the start and end.
    api.getPointsBetween = function(opt){
        // pase options
        opt = opt || {};
        opt.v1 = opt.v1 || new THREE.Vector3();
        opt.v2 = opt.v2 || new THREE.Vector3();
        opt.count = opt.count === undefined ? 1 : opt.count;
        opt.include = opt.include === undefined ? false : opt.include;
        opt.getAlpha = opt.getAlpha || GET_ALPHA_METHODS.simp;
        if(typeof opt.getAlpha === 'string'){
            opt.getAlpha = GET_ALPHA_METHODS[opt.getAlpha];
        }
        var points = [];
        var i = 0;
        while(i < opt.count){
            // use get alpha method
            var a = opt.getAlpha({
                i: i,
                count: opt.count,
                gaParam: opt.gaParam || {}	
            }, opt.gaParam || {});
            // lerp from v1 to v2 using alpha from get alpha method
            var v = opt.v1.clone().lerp(opt.v2, a);
            points.push(v);
            i += 1;
        }
        if(opt.include){
           points.unshift(opt.v1.clone());
           points.push(opt.v2.clone());
        }
        return points;
    };
    // return public api
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

/*
var points = apLerp.getPointsBetween({
    v1: v1,
    v2: v2,
    count: 28,
    include: true,
    getAlpha: 'pow2',
    gaParam: {
        base: 1.5,
        e: 18
    }
});
*/
var points = apLerp.getPointsBetween({
    v1: v1,
    v2: v2,
    count: 28,
    include: true,
    getAlpha: 'porabola',
    gaParam: {
    }
});



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
