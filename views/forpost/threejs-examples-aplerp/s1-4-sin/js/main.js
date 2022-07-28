// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a custom getAlpha method based on Math.sin
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
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
    //******** **********
    // MATH.SIN
    //******** **********
    var parabolaGetAlpha = function(state, param){
        var a = 0.5;
        return a;
    };
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var group = apLerp.createSpheresGroup({
            v1: v1,
            v2: v2,
            count: 80,
            include: true,
            getAlpha: parabolaGetAlpha,
            gaParam: {
            }
        });
    scene.add(group);
    //******** **********
    // USING ORBIT CONTROLS
    //******** **********
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //******** **********
    // APP LOOP
    //******** **********
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
