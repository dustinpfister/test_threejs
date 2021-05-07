(function () {

    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo);

    // mesh in wire frame mode
    var mesh = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(mesh);
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
