// demo of r0 of aplerp.js for threejs-examples-aplerp
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
    // TESTING OUT apLerp.lerp
    //******** **********
    var v1 = new THREE.Vector3(1, 1, 1),
    v2 = new THREE.Vector3(2, 1, 1),
    alpha = 0.5;
    // testing 'simp' get alpha method 
    var opt = { getAlpha: 'simp'};
    console.log( apLerp.lerp(v1, v2, alpha, opt) ); // {x: 1.5, y: 1, z: 1}
    // testing out pow2 get alpha method
    var opt = { 
        getAlpha: 'pow1',
        gaParam: {base: 1.25, e: 14}
    };
    console.log( apLerp.lerp(v1, v2, alpha, opt) ); // {x: 1.2097152, y: 1, z: 1}
    //******** **********
    // POINTS 1 EXAMPLE USING SIMP GET ALPHA METHOD
    //******** **********
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var points1 = apLerp.getPointsBetween({
        v1: v1,
        v2: v2,
        count: 40,
        include: true,
        getAlpha: 'simp'
    });
    var group1 = createSpheresGroup(points1);
    scene.add(group1);
    //******** **********
    // POINTS 2 EXAMPLE USING POW1 GET ALPHA METHOD
    //******** **********
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var points2 = apLerp.getPointsBetween({
        v1: v1,
        v2: v2,
        count: 40,
        include: true,
        getAlpha: 'pow1',
        gaParam: {
            base: 6,
            e: 3
        }
    });
    var group2 = createSpheresGroup(points2);
    group2.position.z = 1;
    scene.add(group2);
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
