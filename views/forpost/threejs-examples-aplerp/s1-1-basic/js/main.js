// demo of r0 of aplerp.js for threejs-examples-aplerp
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


var points = apLerp.getPointsBetween({
    v1: v1,
    v2: v2,
    count: 50,
    include: true,
    getAlpha: 'pow1',
    gaParam: {
        base: 6,
        e: 3
    }
});
console.log(points)

var group = new THREE.Group();
scene.add(group);
points.forEach(function(v){
    var mesh = new THREE.Mesh( new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshNormalMaterial() );
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
