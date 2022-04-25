(function () {
    // SCENE
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // geometry
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0, // triangle 1
                1, 0, 0,
                1, 1, 0
            ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // TRANSLATE AND ROTATE
    geometry.rotateZ(Math.PI / 180 * 135);
    geometry.translate(0.75, 0, 0);

    // mesh
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(custom);
    // render, camera, and loop
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 2, 4);
    camera.lookAt(0, 0, 0);
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