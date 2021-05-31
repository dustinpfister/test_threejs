(function () {
    // sphere geometry and...
    var sphereGeo = new THREE.SphereGeometry(0.5, 15, 20),
    // AN EDGE GEOMETRY CREATED FROM IT WITH thresholdAngle of 10
    edgeGeo = new THREE.EdgesGeometry(sphereGeo, 10),
    line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0.75, 1.00, 0.75);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
