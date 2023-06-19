(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) )
    scene.background = new THREE.Color('blue');
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // GEOETRY WITH JUST A POSITIONS ATTRIBUTE
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // POINTS WITH POINTS MATERIAL
    var material = new THREE.PointsMaterial( { color: 0x00afaf } );
    var points = new THREE.Points(geometry, material)
    scene.add(points);
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();         // UPDATE CONTROLS
        renderer.render(scene, camera); // render
    };
    loop();
}
    ());