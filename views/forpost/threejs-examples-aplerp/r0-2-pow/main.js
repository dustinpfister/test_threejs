// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a few groups with the pow1 built in
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
    // USING POW1 GET ALPHA METHOD
    //******** **********
    var i = 0, len = 25;
    while(i < len){
        var per = i / len;
        var v1 = new THREE.Vector3(-5, 0, 0);
        var v2 = new THREE.Vector3(5, 0, 0);
        var group = apLerp.createSpheresGroup({
            v1: v1,
            v2: v2,
            count: 60 - Math.floor(50 * per),
            include: true,
            getAlpha: 'pow1',
            gaParam: {
                base: 10,
                e: 1.75 + 8 * per
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
