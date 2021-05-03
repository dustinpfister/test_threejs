
(function () {

    // Scene
    var scene = new THREE.Scene();

    var material = new THREE.LineDashedMaterial({
            color: 0x0000ff,
            linewidth: 3,
            scale: .1,
            dashSize: .3,
            gapSize: .1
        });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, 10, 0));

    var line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    scene.add(line);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);


    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    requestAnimationFrame(loop);
    renderer.render(scene, camera);

}
    ());
