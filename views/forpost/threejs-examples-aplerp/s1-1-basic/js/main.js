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
    var group1 = apLerp.createSpheresGroup({
        v1: v1,
        v2: v2,
        count: 40,
        include: true,
        getAlpha: 'simp'
    });
    scene.add(group1);
    //******** **********
    // POINTS 2 EXAMPLE USING POW1 GET ALPHA METHOD
    //******** **********
    var v1 = new THREE.Vector3(-5, 0, 0);
    var v2 = new THREE.Vector3(5, 0, 0);
    var group2 = apLerp.createSpheresGroup({
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
    group2.position.z = 1;
    scene.add(group2);
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
