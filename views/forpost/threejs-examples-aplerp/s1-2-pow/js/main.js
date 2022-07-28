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
    // CREATE SPHERES GROUP HELPER
    //******** **********
    var createSpheresGroup = function(points){
        var group = new THREE.Group();
        scene.add(group);
        points.forEach(function(v){
            var mesh = new THREE.Mesh( new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshNormalMaterial() );
            mesh.position.copy(v);
            group.add(mesh);
        });
        return group;
    };
    
    //******** **********
    // USING POW1 GET ALPHA METHOD
    //******** **********
    var i = 0, len = 25;
    while(i < len){
        var per = i / len;
        var v1 = new THREE.Vector3(-5, 0, 0);
        var v2 = new THREE.Vector3(5, 0, 0);
        var points2 = apLerp.getPointsBetween({
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
        var group2 = createSpheresGroup(points2);
        group2.position.z = -5 + 10 * per;
        scene.add(group2);
        i += 1;
    }
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
