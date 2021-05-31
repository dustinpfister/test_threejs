(function () {
    // box geometry and...
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    // AN EDGE GEOMETRY CREATED FROM IT
    edgeGeo = new THREE.EdgesGeometry(boxGeo);
    var line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
