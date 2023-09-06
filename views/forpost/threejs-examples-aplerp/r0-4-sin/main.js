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
    var sinGetAlpha = function(state, param){
        param.piM = param.piM === undefined ? 2 : param.piM;
        param.bMulti = param.bMulti=== undefined ? 0.1 : param.bMulti;
        param.aOffset = param.aOffset=== undefined ? 0.5 : param.aOffset;
        var r = Math.PI * param.piM * state.p;
        var b = Math.sin( r );
        var a = state.p + b * param.bMulti;
        // apply aOffset
        a += param.aOffset;
        a %= 1;
        // clamp
        a = a < 0 ? 0 : a;
        a = a > 1 ? 1 : a;
        return a;
    };
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var i = 0, len = 20;
    while(i < len){
        var per = i / len;
        var group = apLerp.createSpheresGroup({
                v1: v1,
                v2: v2,
                count: 40,
                include: true,
                getAlpha: sinGetAlpha,
                gaParam: {
                    piM: 2,
                    bMulti: 0.4 - 0.399 * per,
                    aOffset: 0.0
                }
            });
        group.position.z = -5 + 10 * per;
        scene.add(group);
        i += 1;
    }
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
