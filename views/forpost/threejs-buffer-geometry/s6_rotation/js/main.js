(function () {
 
    // SCENE
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 2, 4);
    camera.lookAt(0, 0, 0);
 
    var materials = new THREE.MeshBasicMaterial({
        color: 'red',
        side: THREE.DoubleSide
    });
   
 
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0, // triangle 1
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // TRANSLATE AND ROTATE
    geometry.rotateZ(Math.PI / 180 * 135);
 
 
    // MESH with GEOMETRY, and Normal MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            materials);
    scene.add(custom);
 

    // ADD A POINT LIGHT
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(4, 2, 4);
    scene.add(pointLight);
 
    // add AmbientLight
    var light = new THREE.AmbientLight(0xffffff);
    light.intensity = 0.2;
    scene.add(light);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // LOOP
    var frame = 0,
    maxFrame = 200,
    fps_target = 24,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs >= 1 / fps_target) {
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = -Math.PI * 2 * per;
 
            custom.rotation.set(0, Math.PI * 2 * per, 0);
 
            renderer.render(scene, camera);
            frame += 1;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
 
}
    ());