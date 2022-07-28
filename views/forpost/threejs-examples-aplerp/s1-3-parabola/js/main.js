// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a custom getAlpha method based on an expression
// for a parabola
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
    // PARABOLA
    //******** **********
    var parabola = function(x, h, k){
        return Math.pow(x - h, 2) + k;
    };
    var parabolaGetAlpha = function(state, param){
        var h = 0.5, k = 0;
        var x = state.p;
        var y = parabola(x, h, k);
        var s = x <= 0.5 ? 1 : -1;
        var b = parabola(1, h, k);
        var a = state.p + (y / b) * s;
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
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
